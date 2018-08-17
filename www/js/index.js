var url = 'https://g34czjej1b.execute-api.us-east-1.amazonaws.com/production'
// var url = 'http://localhost:3000'

var USER = []
var IMGCAPAS = []
var BEERITEM = []
var BEERPAR = []
var BEERIMPAR = []
var MAXQTDIMG = 0

MobileUI.formByObject('contetInicial', {
    userEmailName: 'Teste',
    userPassword: '123'
})

window.addEventListener("orientationchange", function(){
    screen.orientation.lock('portrait')
});

function login(){
    var usuario = {}
    usuario.email = document.getElementById('userEmailName').value
    usuario.senha = document.getElementById('userPassword').value    
    if (document.getElementById('userEmailName').value == "" || document.getElementById('userPassword').value == ""){
        alert('Usuário e Senha vazios, verifique e tente novamente por gentileza !')
    } else {
        loading('Por favor aguarde o Login!')
        MobileUI.ajax.post(url + '/login').send(usuario).then(function (res){
            if(res.body.errorMessage) {
                closeLoading()
                alert(res.body.errorMessage)
            } else {
                USER = JSON.parse(JSON.stringify(res.body.data))
                if (USER.typeAccount == 'user'){
                    closeLoading()
                    openPage('main')
                } else {
                    closeLoading()
                    openPage('barAdmin', function (){
                        IMGCAPAS = res.body.data.swiperPhotos
                        BEERITEM = res.body.data.dadosBeer

                        for (i = 0; i < BEERITEM.length; i++){
                            if (isPar(i) == 'par'){
                                BEERPAR.push(res.body.data.dadosBeer[i])
                            } else {
                                BEERIMPAR.push(res.body.data.dadosBeer[i])
                            }
                        }
                        console.log('Length: ' + BEERITEM.length)
                        console.log(BEERPAR)
                        console.log(BEERIMPAR) 
                                               
                        if (IMGCAPAS == undefined){
                            MAXQTDIMG = 0
                        } else {
                            MAXQTDIMG = IMGCAPAS.length
                        }
                        setTimeout(() => {
                            new Swiper('.swipper-gallery', {
                                pagination: '.swiper-pagination'
                            });
                        }, 1000)
                    })
                }
            }
        }).catch(function(err) {
            closeLoading()
            alert('Falha ao realizar o Login! Tente novamente.')
            alert(err)
        })
    }
}

function isPar(number){
    if(number & 1){
        return('impar');
    } else {
        return('par');
    }
}

function createBar() {
    
    openPage('createBar', function() {        
        $("#tellCompany").mask("(99) 9 9999-99 99")
        // MobileUI.formByObject('formCreateBar', {
        //     nomeCompany: 'Bar',
        //     emailCompany: 'bar@bar.com.br',
        //     enderecoCompany: 'Rua do Bar',
        //     nroCompany: '123',
        //     bairroCompany: 'Jd. do Bar',
        //     tellCompany: '12312312312',
        //     passwordCompany: '123',
        //     passwordConfirmCompany: '123'
        // })
    })    
}

function cadUser(){
    var dadosUser = {}
    dadosUser.typeAccount = 'user'
    dadosUser.nomeUser = document.getElementById('nomeUser').value
    dadosUser.emailUser = document.getElementById('emailUser').value
    dadosUser.passwordUser = document.getElementById('passwordUser').value
    dadosUser.passwordConfirmUser = document.getElementById('passwordConfirmUser').value

    loading('Por favor aguarde, estou salvando suas precisas informações!')
    MobileUI.ajax.post(url + '/register').send(dadosUser).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            USER = JSON.parse(JSON.stringify(res.body.data.ops))
            openPage('main')
            closeLoading()
        }
    }).catch(function (err){
        closeLoading()
        alert('Api Error!')
    })
}

function cadBar(){
    var dadosBar = {}
    dadosBar.typeAccount = 'company'
    dadosBar.nomeCompany = document.getElementById('nomeCompany').value
    dadosBar.emailCompany = document.getElementById('emailCompany').value
    dadosBar.enderecoCompany = document.getElementById('enderecoCompany').value
    dadosBar.nroCompany = document.getElementById('nroCompany').value
    dadosBar.bairroCompany = document.getElementById('bairroCompany').value
    dadosBar.tellCompany = document.getElementById('tellCompany').value
    dadosBar.xNomeCompany = ""
    dadosBar.cnpjCompany = ""
    dadosBar.callendar = {
        "weekDays": [
            {
                "day": "Dom",
                "open": document.getElementById('weekDayDomOpen').innerHTML,
                "close": document.getElementById('weekDayDomClose').innerHTML
            },
            {
                "day": "Seg",
                "open": document.getElementById('weekDaySegOpen').innerHTML,
                "close": document.getElementById('weekDaySegClose').innerHTML
            },
            {
                "day": "Ter",
                "open": document.getElementById('weekDayTerOpen').innerHTML,
                "close": document.getElementById('weekDayTerClose').innerHTML
            },
            {
                "day": "Qua",
                "open": document.getElementById('weekDayQuaOpen').innerHTML,
                "close": document.getElementById('weekDayQuaClose').innerHTML
            },
            {
                "day": "Qui",
                "open": document.getElementById('weekDayQuiOpen').innerHTML,
                "close": document.getElementById('weekDayQuiClose').innerHTML
            },
            {
                "day": "Sex",
                "open": document.getElementById('weekDaySexOpen').innerHTML,
                "close": document.getElementById('weekDaySexClose').innerHTML
            },
            {
                "day": "Sab",
                "open": document.getElementById('weekDaySabOpen').innerHTML,
                "close": document.getElementById('weekDaySabClose').innerHTML
            }
        ]
    }

    dadosBar.passwordCompany = document.getElementById('passwordCompany').value
    dadosBar.passwordConfirmCompany = document.getElementById('passwordConfirmCompany').value
    loading('Por favor aguarde, salvando os dados da sua empresa!')
    MobileUI.ajax.post(url + '/register').send(dadosBar).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            USER = JSON.parse(JSON.stringify(res.body.data.ops))
            closeLoading()
            openPage('barAdmin')
        }
    }).catch(function (err){
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu cadastro! Tente novamente por gentileza.')
    })
}

function openAddItem(tpItem){
    if(tpItem == 'beer'){
        MobileUI.show('addItemBoxBeer')
        MobileUI.hide('btnAddItemBeer')
    } else {
        MobileUI.show('addItemBoxPorcao')
        MobileUI.hide('btnAddItemPorcao')
    }
}

function cancelAddItem(tpItem){
    if(tpItem == 'beer'){
        MobileUI.hide('addItemBoxBeer')
        MobileUI.show('btnAddItemBeer')
        var image = document.getElementById('beerImg')
        image.src = 'img/semImg.jpg'
    } else {
        MobileUI.hide('addItemBoxPorcao')
        MobileUI.show('btnAddItemPorcao')
        var image = document.getElementById('porcaoImg')
        image.src = 'img/semImg.jpg'
    }
}

function exitFromApp(){
    navigator.app.exitApp();
}

function goDetail() {
    openPage('bardetail', function (){
        new Swiper('.swipper-gallery', {
            pagination: '.swiper-pagination'
        });
    })
}

function addImgTypes(tpEntrada, tWidth, tHeight, tpImg){
    var tpEnt = ''
    if (tpEntrada == 'cam'){
        tpEnt = 1
    } else {
        tpEnt = 0
    }
        
    var cameraOptions = {
        quality: 90,
        destinationType: 0,
        sourceType: tpEnt,
        allowEdit: true,
        targetWidth: tWidth,
        targetHeight: tHeight,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        direction: 0
    }
    if (MAXQTDIMG <= 6){
        switch (tpImg){
            case 'painel':
                alertGifMessage(cameraOptions)
            break
            case 'beer':
                alertAddBeer(cameraOptions)
            break
            case 'porcao':
                alertAddPorcao(cameraOptions)
            break
        }
    } else {
        alert('Você já cadastrou a quantidade máxima de fotos permitida!')
    }
    
}

function cameraSuccessPainel(imageData){
    var ImgBar = {}
    ImgBar.barName = USER.nomeCompany
    ImgBar.swiperPhotos = {
        "photosCapa": [
            {
                "imgOrder": parseInt(MAXQTDIMG) + 1,
                "base64Photo": "data:image/jpeg;base64," + imageData,                
            }
        ]
    }
    window.addEventListener("orientationchange", function(){
        screen.orientation.lock('landscape-primary')
    })
    loading('Por favor aguarde, estou salvando a imagem do seu estabelecimento.')
    MobileUI.ajax.post(url + '/cadbar').send(ImgBar).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            closeLoading()
            alert('Imagem salva com sucesso.')
            MAXQTDIMG = res.body.data.swiperPhotos.length
            USER = res.body.data
            IMGCAPAS = res.body.data.swiperPhotos
            setTimeout(() => {
                new Swiper('.swipper-gallery', {
                    pagination: '.swiper-pagination'
                });
            }, 1000)
        }
    }).catch(function (err){
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu cadastro! Tente novamente por gentileza.')
    })
    window.addEventListener("orientationchange", function(){
        screen.orientation.lock('portrait')
    })
}

function alertGifMessage(cameraOptions){
    var box = '<div class="grey-800 align-center">'
    box += '    <p>Para ter a melhor foto, por gentileza gire seu dispositivo para a esquerda, o colocando na posição horizontal.</p>'
    box += '    <img src="img/rotate.gif" style="widows: 100px; height: 100px;">'
    box += '</div>'
    alert({
        title: 'Imagens para capa.',
        message: box,
        class: 'grey-800 radius',
        buttons:[
            {
                label: 'Ok',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    navigator.camera.getPicture(cameraSuccessPainel, cameraError, cameraOptions)
                }
            }
        ]
    })
}

function cameraSuccessBeer(imageData){
    var image = document.getElementById('beerImg')
    image.src = "data:image/jpeg;base64," + imageData
    var ImgBarBeer = {}
    ImgBarBeer.swiperPhotos = {
        "itemBeer": [
            {
                "qtdImgBeer": parseInt(MAXQTDIMG) + 1,
                "base64ImgBeer": "data:image/jpeg;base64," + imageData,                
            }
        ]
    }
}

function alertAddBeer(cameraOptions){
    var box = '<div class="grey-800 align-center">'
    box += '    <p>Imagem para apresentação do Item</p>'
    // box += '    <img src="" style="widows: 100px; height: 100px;">'
    box += '</div>'
    alert({
        title: 'Imagens para capa.',
        message: box,
        class: 'grey-800 radius',
        buttons:[
            {
                label: 'Ok',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    navigator.camera.getPicture(cameraSuccessBeer, cameraError, cameraOptions)
                }
            }
        ]
    })
}

function addItem(tpItem){
    var item = {}
    if (tpItem == 'beer'){
        item.dadosBeer = {
            "Beer": [
                {
                    "barName": document.getElementById('nameCompany').innerHTML,
                    "imgBeer": document.getElementById('beerImg').getAttribute('src'),
                    "tituloBeer": document.getElementById('bebidaItemTitle').value,
                    "descricaoBeer": document.getElementById('bebidaItemDetail').value,
                    "precoBeer": document.getElementById('bebidaItemPrice').value
                }
            ]
        }
    } else {
        item.dadosPorcao = {
            "Porcao": [
                {
                    "barName": document.getElementById('nameCompany').innerHTML,
                    "imgPorcao": document.getElementById('porcaoImg').getAttribute('src'),
                    "tituloPorcao": document.getElementById('porcaoItemTitle').value,
                    "descricaoPorcao": document.getElementById('porcaoItemDetail').value,
                    "precoPorcao": document.getElementById('porcaoItemPrice').value
                }
            ]
        }
    }
    loading('Salvando item, aguarde por gentileza!')
    MobileUI.ajax.post(url + '/cadbaritem').send(item).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            closeLoading()
            alert('Item salvo com sucesso.')
            BEERITEM = res.body.data.dadosBeer
        }
    }).catch(function (err){
        console.log(err)
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu item! Tente novamente por gentileza.')
    })
}

function imgOptPopOver(){

     var box = '<div class="grey-800 align-center">'
        box += '    <p>Tirar uma Foto ou buscar na Galeria ?</p>'
        box += '    <div class="row">'
        box += '        <div class="col">'
        box += '            <p class="icon ion-images text-huge"></p>'
        box += '        </div>'
        box += '        <div class="col">'
        box += '            <p class="icon ion-camera text-huge"></p>'
        box += '        </div>'
        box += '    </div>'
        box += '</div>'

    alert({
        title: 'Imagens para capa.',
        message: box,
        class: 'grey-800 radius',
        buttons:[
            {
                label: 'Camera',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    // addImgTypes('cam','720','400','beer')
                }
            },
            {
                label: 'Galeria',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    // addImgTypes('cam','720','400','beer')
                }
            }
        ]
    })
}

function cameraError(){
    alert(message)
}



function showMyCustomizedAlert(content, message){
    alert({
    title:message,
    message:content,
    class:'white radius',
    buttons:[
        {
            label: 'OK',
            class:'text-blue-500',
            onclick: function(){
                closeAlert();
            }
        },
        {
            label:'Cancel',
            class:'text-blue-500',
            onclick: function(){
                closeAlert();
            }
        }
    ]
    });
}

function avaliar(name){
    var box = 'Quem é '+ name +' no rolê? <br/><br/>';
    box += '<button class="text-small margin-bottom full green radius padding" onclick="closeAlert()">Chapa no Rolê</button>';
    box += '<button class="text-small margin-bottom full purple radius padding" onclick="closeAlert()">Vai as vezes</button>';
    box += '<button class="text-small margin-bottom full red full radius padding" onclick="closeAlert()">Nem Chama</button>';
    showMyCustomizedAlert(box, 'Avaliar')
}

function convidar(nameUser, nameBar, nameBeer, valueDecimal, valueCentavos){
    var box = 'Enviar convite para ' + nameUser + ' ?'
    box += '<p> Oii ' + nameUser + ' vamos lá no ' + nameBar + ' tomar uma ' + nameBeer + ' ????</p>';
    box += '<p>Tá só R$ ' + valueDecimal + ',' + valueCentavos + ' !!!</p>';
    box += '<p> Tá ai a Localização... BoraBeber!!!</p>';
    showMyCustomizedAlert(box, 'Convidar')
}

function weekCollor(weekDay){
    var collorSeted = document.getElementById('weekDay' + weekDay).className
    switch (collorSeted) {
        case 'grey-200':
            document.getElementById('weekDay' + weekDay).className = 'text-green'
            break;
        case 'text-green':
            document.getElementById('weekDay' + weekDay).className = 'text-red'
            document.getElementById('weekDay' + weekDay + 'Open').innerHTML = '00:00'
            document.getElementById('weekDay' + weekDay + 'Close').innerHTML = '00:00'
            break;
        case 'text-red':
            document.getElementById('weekDay' + weekDay).className = 'text-green'
            break;
        default:
            break;
    }
}

function weekDayTime(weekDay, status){
    var weekDay = weekDay
    var status = status
    var options = {
        type: 'time',
        date: new Date(),
        minDate: new Date(),
        maxDate: new Date()
    }

    window.DateTimePicker.pick(options, function (date) {
        var ts = new Date(date)
        document.getElementById('weekDay' + weekDay + status).innerHTML = moment(ts).format('HH:mm')
        if (document.getElementById('weekDay' + weekDay + status).innerHTML !== '00:00'){
            document.getElementById('weekDay' + weekDay).className = 'text-green'
        } else {
            document.getElementById('weekDay' + weekDay).className = 'text-red'
        }
    })
}