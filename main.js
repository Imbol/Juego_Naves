var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')
var fondo

var nave = 
{
    x:100,
    y:canvas.height-100,
    width:50,
    height:50
}

var juego = {estado: 'iniciando'}
var teclado = {}
var disparos = []
var enemigos = []

function loadMedia() 
{
    fondo = new Image()
    fondo.src = 'espacio.jpg'
    fondo.onload = function()
    {
        var intervalo = window.setInterval(frameLoop,1000/55)
    }
}

function drawBackground()
{
    ctx.drawImage(fondo,0,0)
}

function drawEnemy()
{
    for(var i in enemigos)
    {
        var enemigo = enemigos[i]
        ctx.save()
        if(enemigo.estado == 'vivo') ctx.fillStyle = 'red'
        if(enemigo.estado == 'muerto') ctx.fillStyle = 'black'
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.heigth)
    }
}

function drawSpaceShip()
{
    ctx.save()
    ctx.fillStyle = 'white'
    ctx.fillRect(nave.x,nave.y,nave.width,nave.height)
    ctx.restore()
}
    
function eventosTeclado()
{
    agregarEventos(document,"keydown",function(e)
    {
        teclado[e.keyCode] = true
    })

    agregarEventos(document,"keyup",function(e)
    {
        teclado[e.keyCode] = false
    })

    function agregarEventos(elemento,nomEvento,funcion)
    {
        if (elemento.addEventListener)
        {
            elemento.addEventListener(nomEvento,funcion,false)
        }
        else if (elemento.attachEvent) 
        {
            elemento.attachEvent(nomEvento,funcion)
        }
    }
}

function moveSpaceShip()
{
    if (teclado[37])//Movimiento izquiera         
    {
        nave.x -= 10
        if (nave.x < 0) nave.x = 0                     
    }
    if (teclado[39])//Movimiento derecha         
    {
        var limite = canvas.width - nave.width
        nave.x += 10
        if (nave.x > limite) nave.x = limite                     
    }
    if (teclado[32]) 
    {
        if (!teclado.fire) 
        {
            fire()
            teclado.fire = true
        }                 
    }
    else teclado.fire = false
}

function upEnemy()
{
    if(juego.estado == 'iniciando')
    {
        for(var i=0;i<10;i++)
        {
            enemigos.push
            ({
                x: 10 + (i*50),
                y: 10,
                width: 40,
                height: 40,
                estado: 'vivo'
            })
        }
        juego.estado == 'jugando'
    }
}

function moveShoot()
{
    for (var i in disparos) 
    {
        var disparo = disparos[i]
        disparo.y -= 2
    }
    disparos = disparos.filter(function(disparo)
    {
        return disparo.y >0
    })
}

function fire()
{
    disparos.push({
        x: nave.x +20,
        y: nave.y -20,
        width: 10,
        height: 30
    })
}

function drawShoot()
{
    ctx.save()
    ctx.fillStyle = 'white'
    for(var i in disparos)
    {
        var disparo = disparos[i]
        ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
    }
    ctx.restore()
}

function frameLoop()
{
    moveSpaceShip()
    upEnemy()
    moveShoot()
    drawBackground()
    drawEnemy()
    drawShoot()
    drawSpaceShip()                                                
}

eventosTeclado()
loadMedia() 


