const DevIds = {
    "549104375927406614": {
        glowColor: 'rgb(255, 0, 182)', // Pink
        gradientStart: 'rgb(120, 0, 189)', // Purple
        gradientEnd: 'rgb(255, 0, 182)', // Pink
        iconUrl: 'https://raw.githubusercontent.com/MAJESTY5164/Automod-Bypasser/main/MainDev.png', // Updated Icon 1
        iconSize: '20px', // Custom icon size for this user
        iconPadding: '0px' // Custom icon padding for this user
    },
    "1365342145162121289": {
        glowColor: 'rgb(0, 255, 255)', // Cyan
        gradientStart: 'rgb(0, 120, 255)', // Blue
        gradientEnd: 'rgb(0, 255, 255)', // Cyan
        iconUrl: 'https://raw.githubusercontent.com/MAJESTY5164/Automod-Bypasser/main/demo.png', // Unique Icon 2
        iconSize: '20px', // Custom icon size for this user
        iconPadding: '0px' // Custom icon padding for this user
    }
};

function applyGlowToAvatar(avatar, id) {
    const { glowColor } = DevIds[id];

    avatar.style.boxShadow = `0 0 10px ${glowColor}, 0 0 15px ${glowColor}, 0 0 20px ${glowColor}`;
    avatar.style.borderRadius = '50%';
    avatar.setAttribute('data-is-special', 'true');
}

function applyGradient(element, id) {
    const { gradientStart, gradientEnd } = DevIds[id];

    element.style.background = `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`;
    element.style.webkitBackgroundClip = 'text';
    element.style.color = 'transparent';
    element.style.fontWeight = 'bold';
}

function changeAvatarGlow() {
    const avatars = document.querySelectorAll('img.avatar__44b0c, img.avatar_c19a55, .avatarWrapper__37e49 img.avatar__44b0c');

    avatars.forEach(avatar => {
        // Loop through DevIds object keys and check if the avatar's src contains the ID
        for (let targetUserId in DevIds) {
            if (avatar.src.includes(targetUserId)) {
                applyGlowToAvatar(avatar, targetUserId);
            }
        }
    });
}

function changeUsernameColor() {
    const usernameElements = document.querySelectorAll('.username__703b9, .username_c19a55, .title_b6c092');

    usernameElements.forEach(username => {
        // Check if this username is inside a reply context
        const isReply = username.closest('.repliedMessage_c19a55');

        // If it is inside a reply context, skip applying color changes to the replied user's username
        if (isReply) {
            return;
        }

        let avatar = username.closest('.member__5d473, .messageListItem__5126c, .avatarWrapper__37e49')?.querySelector('img.avatar__44b0c, img.avatar_c19a55');

        if (!avatar && username.classList.contains('title_b6c092')) {
            avatar = document.querySelector('.avatarWrapper__37e49 img.avatar__44b0c');
        }

        if (avatar && avatar.getAttribute('data-is-special') === 'true') {
            // Loop through DevIds object keys and check if the avatar's src contains the ID
            for (let targetUserId in DevIds) {
                if (avatar.src.includes(targetUserId)) {
                    applyGradient(username, targetUserId);
                }
            }
        }
    });
}

function addIconNextToUsername() {
    // Query all username elements
    const usernameElements = document.querySelectorAll('.username__703b9, .username_c19a55');

    usernameElements.forEach(username => {
        // Check if this username is inside a reply context
        const isReply = username.closest('.repliedMessage_c19a55');

        // If it is inside a reply context, skip adding icons to the replied user's username
        if (isReply) {
            return;
        }

        // Check if the icon is already added (to avoid duplicates)
        if (!username.querySelector('.custom-icon')) {
            let avatar = username.closest('.member__5d473, .messageListItem__5126c, .avatarWrapper__37e49')?.querySelector('img.avatar__44b0c, img.avatar_c19a55');

            // If the avatar exists, we can match the userId and use the corresponding icon URL
            for (let targetUserId in DevIds) {
                if (avatar && avatar.src.includes(targetUserId)) {
                    const { iconUrl, iconSize, iconPadding } = DevIds[targetUserId];

                    // Create the icon element (using an image in this case)
                    const icon = document.createElement('img');
                    icon.src = iconUrl;
                    icon.alt = 'Custom Icon';
                    icon.classList.add('custom-icon'); // Add a custom class to style it

                    // Apply size and padding dynamically
                    icon.style.width = iconSize;  // Use custom icon size from DevIds
                    icon.style.height = iconSize; // Ensure the height matches the width
                    icon.style.marginLeft = '8px'; // Space between the username and the icon
                    icon.style.verticalAlign = 'middle'; // Align icon with the text
                    icon.style.position = 'relative';  // Enable relative positioning
                    icon.style.top = '-2px'; // Move the icon up by 2px
                    icon.style.padding = iconPadding; // Apply custom padding from DevIds

                    // Append the icon next to the username
                    username.appendChild(icon);
                    break; // Stop looping after the icon is added
                }
            }
        }
    });
}

// MutationObserver setup to detect when content changes
const observer = new MutationObserver(() => {
    applyChanges();
});

observer.observe(document.body, {
    childList: true, 
    subtree: true 
});

// Re-apply immediately when the script runs
applyChanges();

function applyChanges() {
    changeAvatarGlow();
    changeUsernameColor();
    addIconNextToUsername();
}

// Set up MutationObserver to observe DOM changes (in case the page dynamically updates content)
const observer2 = new MutationObserver(() => {
    addIconNextToUsername();
});

observer2.observe(document.body, {
    childList: true,
    subtree: true
});

// Apply immediately when the script runs (to add icons right away)
addIconNextToUsername();
