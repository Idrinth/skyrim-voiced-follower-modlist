(() => {
    const modEL = document.getElementById("mod");
    const followerEL = document.getElementById("follower");
    const raceEL = document.getElementById("race");
    const linesEL = document.getElementById("lines");
    const sexEL = document.getElementById("sex");
    const adultEL = document.getElementById('adult');
    const hasXBoxEL = document.getElementById('xbox');
    const interactsEL = document.getElementById('interacts');
    const questEL = document.getElementById('quest');
    const personalQuestEL = document.getElementById('personal-quest');
    const getHash = () => {
        return [
            modEL.value ? 'mod-' + modEL.value : null,
            followerEL.value ? 'follower-' + followerEL.value : null,
            raceEL.value ? 'race-' + raceEL.value : null,
            linesEL.value !== "0" ? 'lines-' + linesEL.value : null,
            sexEL.value.toLowerCase() !== "either" ? 'sex-' + sexEL.value : null,
            adultEL.checked ? 'adult' : null,
            hasXBoxEL.checked ? 'xbox' : null,
            interactsEL.value ? 'interacts-' + interactsEL.value : null,
            questEL.value ? 'quest-' + questEL.value : null,
            personalQuestEL.checked ? 'personal_quest' : null,
        ].filter(val => val).join('|')
    }
    const parseHash = (hash) => {
        adultEL.checked = false;
        hasXBoxEL.checked = false;
        modEL.value = "";
        followerEL.value = "";
        raceEL.value = "";
        linesEL.value = "0";
        linesEL.value = "0";
        sexEL.selectedIndex = 0;
        interactsEL.value = "";
        questEL.value = "";
        personalQuestEL.checked = false;
        for (const element in hash.split('|')) {
            const parts = element.split('-', 2);
            switch (parts[1]) {
                case 'mod':
                    modEL.value = parts[2];
                    break;
                case 'follower':
                    followerEL.value = parts[2];
                    break;
                case 'race':
                    raceEL.value = parts[2];
                    break;
                case 'lines':
                    linesEL.value = parts[2];
                    break;
                case 'sex':
                    if (parts[2].toLowerCase() === 'either') {
                        sexEL.selectedIndex = 0;
                    } else if (parts[2].toLowerCase() === 'male') {
                        sexEL.selectedIndex = 1;
                    } else if (parts[2].toLowerCase() === 'female') {
                        sexEL.selectedIndex = 2;
                    }
                    break;
                case 'adult':
                    adultEL.checked = true;
                    break;
                case 'xbox':
                    hasXBoxEL.checked = true;
                    break;
                case 'personal_quest':
                    personalQuestEL.checked = true;
                    break;
                case 'interacts':
                    interactsEL.value = parts[2];
                    break;
                case 'quest':
                    questEL.value = parts[2];
                    break;
            }
        }
    }
    function search() {
        const mod = modEL.value.toLowerCase();
        const follower = followerEL.value.toLowerCase();
        const race = raceEL.value.toLowerCase();
        const lines = Number.parseInt(linesEL.value);
        const sex = sexEL.value.toLowerCase();
        const adult = adultEL.checked;
        const hasXBox = hasXBoxEL.checked;
        const interacts = interactsEL.value.toLowerCase();
        const quest = questEL.value.toLowerCase();
        const personalQuest = personalQuestEL.checked;

        const hash = getHash();
        if (hash !== location.hash) {
            history.pushState ? history.pushState(null, null, '#' + hash) : location.hash = '#' + hash;
        }

        const mods = document.getElementsByClassName("mod");
        const followers = document.getElementsByClassName("follower");
        for (let i = 0; i < followers.length; i++) {
            let mayDisplay = true;
            if (!followers.item(i).getAttribute('data-name').includes(follower)) {
                mayDisplay = false;
            }
            if (!followers.item(i).getAttribute('data-race').includes(race)) {
                mayDisplay = false;
            }
            if (!followers.item(i).getAttribute('data-interacts').includes(interacts)) {
                mayDisplay = false;
            }
            if (!followers.item(i).getAttribute('data-quest').includes(quest)) {
                mayDisplay = false;
            }
            if (personalQuest && !followers.item(i).hastAtribute('data-personal-quest')) {
                mayDisplay = false;
            }
            const lns = Number.parseInt(followers.item(i).getAttribute('data-lines'));
            if (lns < lines) {
                mayDisplay = false;
            }
            if (sex !== 'either' && sex !== followers.item(i).getAttribute('data-sex')) {
                mayDisplay = false;
            }
            followers.item(i).style.display = mayDisplay ? "list-item" : "none";
        }
        for (let i = 0; i < mods.length; i++) {
            let mayDisplay = mods.item(i).getAttribute('data-mod').includes(mod);
            if (mods.item(i).hasAttribute('data-adult') && !adult) {
                mayDisplay = false;
            }
            if (!mods.item(i).hasAttribute('data-xbox') && hasXBox) {
                mayDisplay = false;
            }
            if (mayDisplay) {
                mayDisplay = false;
                const modFollowers = mods.item(i).getElementsByClassName("follower");
                for (let j = 0; j < modFollowers.length; j++) {
                    if (modFollowers.item(j).style.display !== "none") {
                        mayDisplay = true;
                        break;
                    }
                }
            }
            mods.item(i).style.display = mayDisplay ? "grid" : "none";
        }
    }
    parseHash(location.hash);
    window.setTimeout(search, 100);
    window.addEventListener('hashchange', (event) => {
        const hash = getHash();
        if (hash !== location.hash) {
            parseHash(location.hash);
            search();
        }
    });
    modEL.addEventListener('keyup', search);
    followerEL.addEventListener('keyup', search);
    raceEL.addEventListener('keyup', search);
    linesEL.addEventListener('keyup', search);
    sexEL.addEventListener('change', search);
    adultEL.addEventListener('change', search);
    hasXBoxEL.addEventListener('change', search);
    personalQuestEL.addEventListener('change', search);
    interactsEL.addEventListener('keyup', search);
    questEL.addEventListener('keyup', search);
})();