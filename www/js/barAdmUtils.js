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
                        
            for (i = 0; i < BEERITEM.length; i++){
                if (isPar(i) == 'par'){
                    BEERITEM[i].descricaoBeerPar = BEERITEM[i].descricaoBeer;
                    BEERITEM[i].imgBeerPar = BEERITEM[i].imgBeer;
                    BEERITEM[i].precoBeerPar = BEERITEM[i].precoBeer;
                    BEERITEM[i].tituloBeerPar = BEERITEM[i].tituloBeer;
                    delete BEERITEM[i].descricaoBeer;
                    delete BEERITEM[i].imgBeer;
                    delete BEERITEM[i].precoBeer;
                    delete BEERITEM[i].tituloBeer;
                } else {
                    BEERITEM[i-1].descricaoBeerImpar = BEERITEM[i].descricaoBeer;
                    BEERITEM[i-1].imgBeerImpar = BEERITEM[i].imgBeer;
                    BEERITEM[i-1].precoBeerImpar = BEERITEM[i].precoBeer;
                    BEERITEM[i-1].tituloBeerImpar = BEERITEM[i].tituloBeer;
                    delete BEERITEM[i].descricaoBeer;
                    delete BEERITEM[i].imgBeer;
                    delete BEERITEM[i].precoBeer;
                    delete BEERITEM[i].tituloBeer;
                    delete BEERITEM[i]
                }
            }
            document.getElementById('beerImg').getAttribute('src') = 'img/semImg.jpg'
            document.getElementById('bebidaItemTitle').value = ''
            document.getElementById('bebidaItemDetail').value = ''
            document.getElementById('bebidaItemPrice').value = ''
        }
    }).catch(function (err){
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu item! Tente novamente por gentileza.')
    })
}

function editItemBeer(img, title, descri, preço){
    alert(img + ' ' + title + ' ' + descri + ' ' + preço)
    
}
