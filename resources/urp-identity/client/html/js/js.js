function CreatePersonage() {
    let data = {};
    data.firstname = $('#firstname').val();
    data.lastname = $('#lastname').val();
    data.brithdate = $('#birthdate').val();
    data.gender = $('#gender').val();
    if (data.firstname) {
        if (data.lastname) {
            if (data.brithdate) {
                if (data.gender) {
                    alt.emit('Identity:Create', JSON.stringify(data));
                    alt.emit('Identity:close');
                } else {
                    alt.emit('Identity:notify', 'Enter a sex');
                }
            } else {
                alt.emit('Identity:notify', 'insert date of birth');
            }
        } else {
            alt.emit('Identity:notify', 'Insert last name');
        }
    } else {
        alt.emit('Identity:notify', 'Insert first name');
    }
}
