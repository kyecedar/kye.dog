const lightswitch = document.querySelector('.lightswitch');
const lightswitchIndicator = document.querySelector('.lightswitch .indicator');
const pullchainImage = document.querySelector('.pullchainimage');
const animationLightToDark = 'light-to-dark';
const animationDarkToLight = 'dark-to-light';
const animationPullchainRecoil1 = 'pullchain-recoil-1';
const animationPullchainRecoil2 = 'pullchain-recoil-2';

const isPullchainHeld = () => {
    return document.documentElement.getAttribute('held') !== null;
};

const holdPullchain = () => {
    document.documentElement.setAttribute('held', '');
};

const releasePullchain = () => {
    document.documentElement.removeAttribute('held');
};

const toggleLightswitch = () => {
    if(lightswitchIndicator.style.animationName === animationLightToDark) {
        document.documentElement.setAttribute('theme', 'light');
        lightswitchIndicator.style.setProperty('--frame', '1');
        lightswitchIndicator.style.animationName = animationDarkToLight;
        localStorage.setItem('theme', 'light');
        return;
    } else {
        document.documentElement.setAttribute('theme', 'dark');
        lightswitchIndicator.style.setProperty('--frame', '10');
        lightswitchIndicator.style.animationName = animationLightToDark;
        localStorage.setItem('theme', 'dark');
        return;
    }
};

document.addEventListener('mousedown', (event) => {
    if(event.target === pullchainImage && !isPullchainHeld()) {
        holdPullchain();
        pullchainImage.setAttribute('held', '');
    }
})

document.addEventListener('mouseup', (_event) => {
    if(isPullchainHeld()) {
        releasePullchain();
        pullchainImage.removeAttribute('held');
        if(pullchainImage.style.animationName === animationPullchainRecoil1)
            pullchainImage.style.animationName = animationPullchainRecoil2;
        else pullchainImage.style.animationName = animationPullchainRecoil1;
        toggleLightswitch();
    }
});

// lightswitch.onclick = (event) => {
//     console.log(event);
//     lightswitchHeld = true;
// };

// get theme and set as current.
if(localStorage.getItem('theme')) {
    let theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('theme', theme);

    if(theme === 'light') {
        lightswitchIndicator.style.setProperty('--frame', '1');
        lightswitchIndicator.style.animationName = animationDarkToLight;
    } else {
        lightswitchIndicator.style.setProperty('--frame', '10');
        lightswitchIndicator.style.animationName = animationLightToDark;
    }
} else {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('theme', 'light');
}