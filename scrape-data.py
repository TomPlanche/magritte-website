"""
Scrape arts that I need from sevreral websites.

Author:
    Tom Planche (github.com/tomPlanche)
"""
import asyncio
import json
import os
import requests
from bs4 import BeautifulSoup
import re
from rich.console import Console
import fcntl

# Constants
ARTISTS = {
    "René Magritte": "https://www.renemagritte.org/rene-magritte-paintings.jsp",
}

ASSETS_FOLDER = "src/assets"
PAINTINGS_FOLDER = ASSETS_FOLDER + "/paintings"


# Functions
async def download_image(
    url: str,
    filename: str,
    artist: str,
    date: str,
    description: str,
    art_url: str,
) -> None:
    """
    Download an image from an url and save the information in a JSON file.

    Args:
        url (str): The url of the image.
        filename (str): The name of the file to save the image.
        artist (str): The artist of the image.
        date (str): The date of the image.
        description (str): The date of the image.
        art_url (str): The url of page describing the painting.

    Returns:
        None
    """
    artist = remove_accents(artist.lower().strip().rstrip())

    if not os.path.exists(f"{ASSETS_FOLDER}/artists.json"):
        with open(f"{ASSETS_FOLDER}/artists.json", "w") as f:
            json.dump({}, f)

    with open(f"{ASSETS_FOLDER}/artists.json", "r") as f:
        artists = json.load(f)

    if artist not in artists:
        artists[artist] = {}

    if filename not in artists[artist]:
        artists[artist][filename] = {
            "description": description,
            "date": date,
            "url": art_url,
        }

        r = requests.get(url)

        with open(f"{PAINTINGS_FOLDER}/{filename}", "wb") as f:
            f.write(r.content)

        with open(f"{ASSETS_FOLDER}/artists.json", "w") as f:
            # Acquire an exclusive lock on the file
            fcntl.flock(f.fileno(), fcntl.LOCK_EX)
            json.dump(artists, f)
            # Release the lock
            fcntl.flock(f.fileno(), fcntl.LOCK_UN)
            print(f"File {filename} downloaded.")
    else:
        print(f"File {filename} already exists.")


def remove_accents(word: str) -> str:
    """
    Remove accents from words.
    Args:
        word: The word

    Returns:
        (str) The word replaced them by its non-accented version.
    """
    accents = [
        ["àâä", "a"],
        ["éèêë", "e"],
        ["îï", "i"],
        ["ôö", "o"],
        ["ùûü", "u"],
        ["ÿ", "y"],
        ["ç", "c"]
    ]

    for accenteds, non_accented in accents:
        word = re.sub(fr'[{accenteds}]', non_accented, word)

    return word


def get_soup(url: str) -> BeautifulSoup:
    """
    Get the soup of a website.

    Args:
        url (str): The url of the website.

    Returns:
        BeautifulSoup: The soup of the website.
    """
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    return soup


def prepare_image_name(author: str, name: str) -> str:
    """
    Prepare the file name of an image.
    It will be the author's name and the name of the image.
    It will remove all the accents by replacing them by their non-accented version.

    The final file name will be in the following format:
    artist_name-image_name.jpg

    Args:
        author (str): The author of the image.
        name (str): The name of the image.

    Returns:
        str: The file name of the image.
    """

    author = remove_accents(author.lower().strip().rstrip())
    name = remove_accents(name.lower().strip().rstrip())

    # Replace "'" by a '_'
    author = re.sub(r"'+", "_", author)
    name = re.sub(r"'+", "_", name)

    # Replace all the spaces by a '_'
    author = re.sub(r"\s+", "_", author)
    name = re.sub(r"\s+", "_", name)

    return f"{author}-{name}.jpg"


async def get_magritte() -> None:
    """
    Get the paintings of René Magritte.

    The website is made of a unique table with all the paintings.
    Each row of the table is a painting.
    The first column is the image of the painting, it contains the link to the image.
    The link is in the src attribute of the img tag, but it is relative. '/images/thumbs/name.jpg'

    Returns:
        None
    """
    assert os.path.exists(ASSETS_FOLDER), f"Assets folder does not exist: {ASSETS_FOLDER}"
    assert os.path.exists(PAINTINGS_FOLDER), f"Paintings folder does not exist: {PAINTINGS_FOLDER}"

    # Constants
    AUTHOR = "René Magritte"
    WEB_URL_ROOT = ARTISTS[AUTHOR].split(".org/")[0] + ".org"

    # Functions
    async def get_art(
        url: str,
    ) -> None:
        """
        Get the art from the table.

        Args:
            url (str): The url of the painting.

        Returns:
            None
        """

        art_soup = get_soup(url)

        art_name_and_perhaps_date = art_soup.find("h1")

        if ',' in art_name_and_perhaps_date.text:
            art_name, art_date = [x.strip().rstrip() for x in art_name_and_perhaps_date.text.split(',')]

            if match := re.match(r".*?(\d{4}).*", art_date):
                art_date = match.group(1)
            else:
                art_date = "None"
        else:
            art_name = art_name_and_perhaps_date.text
            art_date = "None"

        art_image = WEB_URL_ROOT + art_soup.find("table").find("img")["src"]
        art_description = re.sub(r"\s+", " ", art_soup.find("div", {"class": "art-PostContent"}).text.strip().rstrip())

        # Prepare the file name
        filename = prepare_image_name(AUTHOR, art_name)

        # Download the image
        await download_image(
            art_image,
            filename,
            AUTHOR,
            art_date,
            art_description,
            url
        )

    # Get the soup of the website
    soup = get_soup(ARTISTS[AUTHOR])

    # Get the table
    table = soup.find("table")

    console = Console()
    with console.status("[bold green]Downloading...") as status:
        for i, row in enumerate(table.find_all("tr")):
            art_url = WEB_URL_ROOT + row.find("a")["href"]
            await get_art(
                art_url
            )

            # Update the console like 'Downloading 1/10'
            status.update(f"[bold green]Downloading {i + 1}/{len(table.find_all('tr'))}...")

    console.print(f"[bold green]All the paintings of {AUTHOR} have been downloaded.")


def test():
    a = "zefazef, 1920"
    b = "zefazef 1234, René Magritte 1924"
    c = "zefazef 1234, René Magritte"
    d = "azefazef"

    list_ = [a, b, c, d]

    for i in list_:
        art_name_and_perhaps_date_text = i
        if ',' in art_name_and_perhaps_date_text:
            art_name, art_date = [x.strip().rstrip() for x in art_name_and_perhaps_date_text.split(',')]

            if match := re.match(r".*?(\d{4}).*", art_date):
                art_date = match.group(1)
            else:
                art_date = "None"
        else:
            art_name = art_name_and_perhaps_date_text
            art_date = "None"

        print(f"art_name: {art_name} | art_date: {art_date}")


if __name__ == "__main__":
    asyncio.run(get_magritte())
    # test()
