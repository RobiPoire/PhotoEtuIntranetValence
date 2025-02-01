/**
 * Retrieves the username from the profile image.
 * @returns {string|null} The extracted username or null if not found.
 */
function getUsername() {
    const profileImg = document.querySelector("img.profil-photo");
    if (!profileImg) return null;

    const match = profileImg.src.match(/photo\/Etudiants\/([^\/]+)\//);
    return match ? match[1] : null;
}

/**
 * Updates image and link URLs by replacing the old username with the extracted one.
 * @param {string} username - The username extracted from the profile image.
 */
function updateImages(username) {
    if (!username) return;

    document.querySelectorAll("img, a").forEach((element) => {
        const attribute = element.tagName === "IMG" ? "src" : "href";
        if (!element[attribute]) return; // Ensure the attribute exists

        const match = element[attribute].match(/photo\/Etudiants\/([^\/]+)\/([^\/]+)\.jpg/);
        if (match && match[1] !== username) {
            element[attribute] = element[attribute].replace(match[1], username);
        }
    });
}

/**
 * Initializes the script: extracts the username and updates image links accordingly.
 */
function init() {
    const username = getUsername();
    if (username) {
        updateImages(username);
    }

    // Observes dynamic DOM changes to update newly loaded images.
    const observer = new MutationObserver(() => updateImages(username));
    observer.observe(document.body, {childList: true, subtree: true});
}

// Execute the script when the page loads.
init();
