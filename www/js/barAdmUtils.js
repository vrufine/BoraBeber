var BEERITEM = []
var DADOSBAR = []

function getDadosBar(barName){
    loading('Buscando dados do estabelecimento.')
    MobileUI.ajax.get(url + '/conscompany?nome=' + barName).send().then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            closeLoading()
            openPage('dadosBar', function(){
                DADOSBAR = res.body.data
                MobileUI.formByObject('formDadosBar', res.body.data)
                
                for(i=0; i<=6; i++){
                    document.getElementById('weekDay' + DADOSBAR.callendar.weekDays[i].day + 'OpenDadosBar').innerHTML = DADOSBAR.callendar.weekDays[i].open
                    document.getElementById('weekDay' + DADOSBAR.callendar.weekDays[i].day + 'CloseDadosBar').innerHTML = DADOSBAR.callendar.weekDays[i].close
                }            
            })
        }
    }).catch(function(err) {
        closeLoading()
        alert('Falha ao capturar dados do estabelecimento.')
        alert(err)
    })
}   

function exitFromApp(){
    navigator.app.exitApp();
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
        document.getElementById('bebidaItemTitle').value = ''
        document.getElementById('bebidaItemDetail').value = ''
        document.getElementById('bebidaItemPrice').value = ''
    } else {
        MobileUI.hide('addItemBoxPorcao')
        MobileUI.show('btnAddItemPorcao')
        var image = document.getElementById('porcaoImg')
        image.src = 'img/semImg.jpg'
    }
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
            case 'bar':
                alertAddImgBar(cameraOptions)
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

function cameraError(){
    alert(message)
}

function alertAddBeer(cameraOptions){
    var box = '<div class="grey-800 align-center">'
    box += '    <p>Imagem para apresentação do Item</p>'
    // box += '    <img src="" style="widows: 100px; height: 100px;">'
    box += '</div>'
    alert({
        title: 'Imagens para o Item',
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

function cameraSuccessBar(imageData){
    var image = document.getElementById('imgBar')
    image.src = "data:image/jpeg;base64," + imageData
    var imgBar = "data:image/jpeg;base64," + imageData
}

function alertAddImgBar(cameraOptions){
var box = '<div class="grey-800 align-center">'
    box += '    <p>Escolha uma boa imagem para seu estabelecimento!</p>'
    box += '    <p>Pode ser uma logo ou uma imagem de apresentação. Esta irá aparecer na listagem de todos os bares !</p>'
    box += '    <p>Você poderá altera-la aqui sempre que quiser.</p>'
    box += '</div>'
    alert({
        title: 'Imagens para o Bar',
        message: box,
        class: 'grey-800 radius',
        buttons:[
            {
                label: 'Ok',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    navigator.camera.getPicture(cameraSuccessBar, cameraError, cameraOptions)
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
    var erro = ''
    loading('Salvando item, aguarde por gentileza!')
    MobileUI.ajax.post(url + '/cadbaritem').send(item).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            closeLoading()
            alert('Item salvo com sucesso.')
            updateListItens(res.body.data.dadosBeer)
        }
    }).catch(function (err){
        console.log(err, erro)
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu item! Tente novamente por gentileza.')
    })
}

function editItemBeer(idBar, idBeer, img, descri, preco){
var  box = '<div class="align-center" style="margin-left: 15px; margin-right: 15px;">'
    box += '    <div class="text-center">'
    box += '        <img src="' + img + '" style="height: 110px;" id="beerImg" class="radius">'
    // box += '        <button class="icon ion-ios-loop-strong text-green text-strong" style="float: right; position: absolute; z-index:7; margin-top: 68px; margin-left: -42px;"></button>'
    box += '    </div>'
    box += '    <div class="list no-border">'
    // box += '        <div class="item border-grey-800 border-bottom" style="height: 40px;">'
    // box += '            <input type="text" class="text-black" placeholder="Título do Item" id="bebidaItemTitle" value="' + title + '">'
    // box += '        </div>'
    box += '        <div class="item border-grey-800 border-bottom" style="height: 40px;">'
    box += '            <input type="text" class="text-black" placeholder="Descrição do Item" id="bebidaItemDetail" value="' + descri + '">'
    box += '        </div>'
    box += '        <div class="item label-fixed border-grey-800 border-bottom" style="height: 50px;">'
    box += '            <label style="margin-left: -43px;  margin-right: -30px; margin-top: 2px;">R$</label>'
    box += '            <input type="number" class="text-black" placeholder="Preço" class="text-big" id="bebidaItemPrice" value="' + parseFloat(preco.replace(",",".")) + '">'
    box += '        </div>'
    box += '    </div>'
    box += '</div>'
    
    alert({
        title: 'Editar Item',
        message: box,
        class: 'grey-50 radius',
        buttons:[
            {
                label: 'Salvar',
                class: 'text-black',
                onclick: function(){
                    closeAlert()
                }
            },
            {
                label: 'Del',
                class: 'text-black',
                onclick: function(){
                    alert({
                        title: 'Confirmação',
                        message: 'Deseja remover o item  da sua lista de produtos ?',
                        class: 'grey-50 radius',
                        buttons: [
                            {
                                label: 'Não',
                                class: 'text-black',
                                onclick: function(){
                                    closeAlert()
                                }
                            },
                            {
                                label: 'Sim',
                                class: 'text-black',
                                onclick: function(){
                                    dellItemBeer(idBar, idBeer)
                                    closeAlert()
                                }
                            }
                        ]
                    }, closeAlert())
                }
            },
            {
                label: 'Canc',
                class: 'text-black',
                onclick: function(){
                    closeAlert()
                }
            }
        ]
    })
}

function updateItemBeer(){

}

function dellItemBeer(idBar, idBeer){
    var item = {}
    item.idBar = idBar
    item.idBeer = idBeer
    loading('O item será removido de seus produtos, por favor aguarde!')
    MobileUI.ajax.post(url + '/removebeer').send(item).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            IMGCAPAS = res.body.data.swiperPhotos
            BEERITEM = res.body.data.dadosBeer
            closeLoading()
            updateListItens()
            alert('Item removido com sucesso.')
        }
    }).catch(function (err){
        console.log(err)
        closeLoading()
        alert('Erro')
    })
}

function updateListItens(){
    if (BEERITEM !== undefined){
        for (i = 0; i < BEERITEM.length; i++){
            if (BEERITEM[i].descricaoBeer == ""){
                BEERITEM[i].descricaoBeer = ""
            }
            if (BEERITEM[i].imgBeer == ""){
                BEERITEM[i].imgBeer = "img/semImg.jpg"
            }
            if (BEERITEM[i].precoBeer == ""){
                BEERITEM[i].precoBeer = "0,00"
            } else {
                BEERITEM[i].precoBeer = BEERITEM[i].precoBeer.replace(".",",")
            }
            if (BEERITEM[i].tituloBeer == ""){
                BEERITEM[i].tituloBeer = ""
            }
            if (BEERITEM[i].medida == ""){
                BEERITEM[i].medida = ""
            }
            if (BEERITEM[i].recipiente == ""){
                BEERITEM[i].recipiente = ""
            }
            
            if (isPar(i) == 'par'){
                // BEERITEM[i].idBarPar = res.body.data._id
                BEERITEM[i].idBeerPar = BEERITEM[i].idBeer
                BEERITEM[i].descricaoBeerPar = BEERITEM[i].descricaoBeer
                BEERITEM[i].imgBeerPar = BEERITEM[i].imgBeer
                BEERITEM[i].precoBeerPar = BEERITEM[i].precoBeer
                BEERITEM[i].tituloBeerPar = BEERITEM[i].tituloBeer
                BEERITEM[i].medidaPar = BEERITEM[i].medida
                BEERITEM[i].recipientePar = BEERITEM[i].recipiente
                delete BEERITEM[i].idBeer
                delete BEERITEM[i].descricaoBeer
                delete BEERITEM[i].imgBeer
                delete BEERITEM[i].precoBeer
                delete BEERITEM[i].tituloBeer
                delete BEERITEM[i].medida
                delete BEERITEM[i].recipiente
            } else {
                console.log('impar')
                // BEERITEM[i-1].idBarImpar = res.body.data._id
                BEERITEM[i-1].idBeerImpar = BEERITEM[i].idBeer
                BEERITEM[i-1].descricaoBeerImpar = BEERITEM[i].descricaoBeer
                BEERITEM[i-1].imgBeerImpar = BEERITEM[i].imgBeer
                BEERITEM[i-1].precoBeerImpar = BEERITEM[i].precoBeer
                BEERITEM[i-1].tituloBeerImpar = BEERITEM[i].tituloBeer
                BEERITEM[i-1].medidaImpar = BEERITEM[i].medida
                BEERITEM[i-1].recipienteImpar = BEERITEM[i].recipiente
                delete BEERITEM[i].idBeer
                delete BEERITEM[i].medida
                delete BEERITEM[i].recipiente
                delete BEERITEM[i].descricaoBeer
                delete BEERITEM[i].imgBeer
                delete BEERITEM[i].precoBeer
                delete BEERITEM[i].tituloBeer
                delete BEERITEM[i]
            }
        }
    }
}