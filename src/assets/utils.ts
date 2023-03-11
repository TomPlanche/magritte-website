/**
 * @file src/assets/utils.js
 * @description This file contains the functions to get the artists from the 'artists_file' file/
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
const artists_file = 'src/assets/artists.json';
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
/**
 * @description Get the artists from the 'artists_file' file.
 * The artists are stored in an JSON file.
 * The artists are the root keys of the JSON file.
 * @returns {Array} The artists
 */
const getPaintings = async (): Promise<String> => {
	return new Promise((resolve, reject) => {
		fetch(artists_file)
			.then((response) => {
				response.json().then((data) => {
					resolve(data);
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
}


// function getPaintings() {
// 	fetch(artists_file)
//       .then((response) => {
//
// 				response.json().then((data) => {
// 					console.log(data);
//
// 				});
// 			})
// }

// Export the functions
export { getPaintings };

/**
 * End of file src/assets/utils.js
 */
