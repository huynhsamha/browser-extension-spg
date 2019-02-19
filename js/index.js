const options = ['specials', 'lowercase', 'uppercase', 'numbers'];

const availableChars = {
    specials: '!@#$%^&*()_+{}:"<>?\|[];\',./`~',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789'
}

function shuffle(string) {
    const array = string.split('');
    let tmp, current, top = array.length;

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array.join('');
}

function randPickOne(avaiChars) {
    const character = avaiChars.charAt(Math.floor(Math.random() * avaiChars.length));
    return character;
}

function randPick(exclusions, avaiChars, min, max) {
    const numChars = max !== undefined ? min + Math.floor(Math.random() * (max - min + 1)) : min;
    let chars = '';

    let i = 0;
    while (i < numChars) {
        const character = randPickOne(avaiChars);
        if (exclusions.indexOf(character) < 0 && chars.indexOf(character) < 0) {
            chars += character;
            i++;
        }
    }

    return chars;
}

function generatePassword(passwordLength, selectedOptions) {
    let password = '', totalChars = '';

    let firstRoundPick = 3;
    if (passwordLength < 9) { // 6, 7, 8
        firstRoundPick = selectedOptions.length < 3 ? 2 : 1;
    } else if (passwordLength < 13) { // 9, 10, 11, 12
        firstRoundPick = selectedOptions.length < 3 ? 3 : 2;
    }

    selectedOptions.forEach(i => {
        totalChars += availableChars[i];
        password += randPick(password, availableChars[i], 1, firstRoundPick);
    })

    const restLength = passwordLength - password.length;
    for (let i=0;i<restLength;i++) password += randPickOne(totalChars);

    return shuffle(password);
}

function showError(errorMessage) {
    const $err = $('.spg-error');
    $err.text(errorMessage);
    $err.fadeIn(150);
}

function hideError() {
    $('.spg-error').fadeOut(0);
}

$('#spg-btn-gen').click(() => {
    const passwordLength = $('#spg-pwd-len').val();
    const selectedOptions = options.filter(i => {
        return $(`#spg-cb-${i}`).prop('checked');
    })
    if (selectedOptions.length == 0) {
        return showError('Require at least one option selected')
    }
    hideError();
    $('#spg-inp-pwd').val(generatePassword(passwordLength, selectedOptions));
})

$('#spg-inp-pwd').click((function () {
    this.select();
}));

$('#spg-btn-copy').click(() => {
    $('#spg-inp-pwd').select();
    document.execCommand('copy');
    $('.spg-copied').fadeIn(150);
    setTimeout(() => {
        $('.spg-copied').fadeOut(100);
    }, 1000);
})