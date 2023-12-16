const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🍃Fue un placer ayudarte',
        'Si tienes alguna consulta no dudes en escribirnos',
    ],
    null,
    null,
)

const flowPedidoAsesor = addKeyword(['pedido', 'pedidos', 'pedir'])
    .addAnswer('🌿 Un asesor en ventas se comunicará con usted en la brevedad posible',
    null,
    null, 
    [flowGracias]
)

const flowPedido = addKeyword(['3'])
    .addAnswer(
        [
            '✨ Es de nuestro agrado brindarle todos los productos que tenemos',
            '',
            'Si deseas hacer un pedido escribe *pedido*',
        ],
    null,
    null,
    [flowPedidoAsesor]
) 

const flowOferta1 = addKeyword('1')
        .addAnswer('🎁 En el mes de la familia te ofrecemos Canastas Navideñas que vienen con Leche de Almendras, Panetón artesanal, Chocolate de cacao al 99% a tan solo 50 soles',
        null,
        null,
).addAnswer('👉 Para ver más ofertas escriba *0*, para ir al menú principal escriba *1*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowOferta)
    } else if (ctx.body.includes('1')) {
        return gotoFlow(flowPrincipal)
    }
}) 

const flowOferta2 = addKeyword('2')
        .addAnswer('🎁 Por que una pausa activa merece disfrutarlo con un delicioso snack, nuestros palichik oferta 3 por 1',
        null,
        null,
).addAnswer('👉 Para ver más ofertas escriba *0*, para ir al menú principal escriba *1*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowOferta)
    } else if (ctx.body.includes('1')) {
        return gotoFlow(flowPrincipal)
    }
}) 

const flowOferta3 = addKeyword('3')
        .addAnswer('🎁 En estos tiempos de estrés relájate con aceites esenciales. Oferta del mes Eucasol a solo 100 soles',
        null,
        null,
).addAnswer('👉 Para ver más ofertas escriba *0*, para ir al menú principal escriba *1*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowOferta)
    } else if (ctx.body.includes('1')) {
        return gotoFlow(flowPrincipal)
    }
}) 

const flowOferta4 = addKeyword('4')
        .addAnswer('🎁 Es primordial tener una buena salud corporal y cuidar la piel, por ello este mes tenemos una oferta de Crema de Tea Tree y Crema de Enebro a solo 200 soles',
        null,
        null,
).addAnswer('👉 Para ver más ofertas escriba *0*, para ir al menú principal escriba *1*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowOferta)
    } else if (ctx.body.includes('1')) {
        return gotoFlow(flowPrincipal)
    }
}) 

const flowOferta5 = addKeyword('5')
        .addAnswer('🎁 Por este mes tenemos la mejor oferta en medicina, Selenio Plus a solo 80 soles',
        null,
        null,
).addAnswer('👉 Para ver más ofertas escriba *0*, para ir al menú principal escriba *1*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowOferta)
    } else if (ctx.body.includes('1')) {
        return gotoFlow(flowPrincipal)
    }
}) 

const flowOferta = addKeyword(['2'])
    .addAnswer('🍀Por este mes lleno de amor y regalos tenemos las siguientes ofertas:',)
    .addAnswer(
        [
            'Escriba el número de la oferta que desea ver',
            '',
            '1) Alimentos 🍞',
            '2) Snack 🍪',
            '3) Aromaterapia 🌼',
            '4) Cuidado de la piel y el cuerpo 🫧',
            '5) Medicina y suplementos 🌿',
        ],
    null,
    null,
    [flowOferta1, flowOferta2, flowOferta2, flowOferta3, flowOferta4, flowOferta5], 
)

const flowConsulta = addKeyword(['1']).addAnswer(
    ['En breve te estaremos llamando  📞 para brindarte una asesoría integral'],
    null,
    null,
    [flowGracias]
).addAnswer('👉 Si deseas regresar al menú principal escribe *0*', {capture:true}, async(ctx, {gotoFlow}) => {
    if (ctx.body.includes('0')) {
       return gotoFlow(flowPrincipal)
    }
}) 

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'holis', 'holi', 'hol', 'oal', 'holas'])
    .addAnswer('🌱 Hola, ¿en qué podemos ayudarte?')
    .addAnswer(
        [
            'Escoge una opción escribiendo el número',
            '',
            '1) Realizar una *Consulta* 📱',
            '2) Ver las *Ofertas* ✨',
            '3) Realizar un *Pedido* 🎁',
        ],
        null,
        null,
        [flowPedido, flowGracias, flowOferta, flowConsulta],
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()