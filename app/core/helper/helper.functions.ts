//6 Haneli SMS kodu Üretir
function generateSmsCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

//Telefon Numarası Formatlar
function phoneFormat(phonenum: any) {
    var cleanNumber = phonenum.replace(/[^0-9]+/ig, '');
    if(cleanNumber && (cleanNumber.length >= 10)){
        if(cleanNumber.length == 10){
            return '+90'+cleanNumber;
        }else if(cleanNumber.length == 11 && cleanNumber[0] == 0){
            return '+9'+cleanNumber;
        }else{
            return '+'+cleanNumber;
        }
    }
    return '';
}

//SlugText
function toSlug(text: string) {
    var trMap = {
        'çÇ':'c',
        'ğĞ':'g',
        'şŞ':'s',
        'üÜ':'u',
        'ıİ':'i',
        'öÖ':'o'
    };
    for(var key in trMap) {
        text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
    }
    return text.replace(/[^-a-zA-Z0-9\s]+/ig, '').replace(/\s/gi, "-").replace(/[-]+/gi, "-").toLowerCase();
}

//String Parcalar. Örneğin: İsim soyisim yazılan bir string'i boşluga göre parçalar ve index'de belirtiğiniz değeri döner.
function textParse(str: string, index: number = 1) {
    if(!str)
        return "";

    let name = str.split(" ");
    let lastName = name.pop();
    let firstName = name.join(' ');
    return (index == 1) ? lastName : firstName;
}

//TR: Karakterlerin ilk harfinin büyük yapar.
function textCapitalize(str) {
    return str.toLocaleLowerCase('tr-TR').replace(/(?:^|\s|,|;|!|:|-|\.|\?)[a-z0-9ğçşüöı]/g, function(match) {
        return match.toLocaleUpperCase('tr-TR');
    });
}

//TR: Karakterleri büyük harfe çevirir
function textUppercase(str) {
    return str.toLocaleUpperCase('tr-TR');
}

//Karakterleri Küçük harfe çevirir.
function textLowercase(str) {
    return str.toLocaleLowerCase('tr-TR');
}

//Boşlukları temizle
function clearSpace(str){
    return str.replace(/\s/g,'');
}

function createOrderId(prefix: string = ''){
    return prefix + 
            Math.floor(10 + Math.random() * 99) +
            (new Date().valueOf()).toString().slice(-7) +
            (Math.floor( + (100 + Math.random() * 999)))
            .toString();
}




export {
    phoneFormat,
    toSlug,
    textParse,
    textCapitalize,
    textUppercase,
    textLowercase,
    createOrderId,
    generateSmsCode,
    clearSpace
}