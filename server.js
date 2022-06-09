const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 5010 });

wss.on('connection', ws => {
    console.log('new client connected');

    ws.on('message', data => {
        let message = data.toString().split(' ');

        const faqs = [{
            question: 'Qual a cor do céu?',
            reponse: 'azul'
        }, {
            question: 'Qual protocolo está sendo usado nesse req?',
            reponse: 'WebSocket'
        }, {
            question: 'Qual o nome completo da PUC?',
            reponse: 'Pontifícia Universidade Católica'
        }];


        let check = []
        let count = 0;

        faqs.forEach((faq, i) => {
            count = 0;
            question = faq.question.split(' ');
            let found = null;
            question.forEach(q => {
                found = message.find(m => q == m);
                if (found)
                    count += 1;
            });

            check.push(count);
        });

        const index = check.indexOf(Math.max(...check));

        if (index === 0)
            ws.send('No response avaliable');
        else
            ws.send(`Response: ${faqs[index].reponse}`);


    })

    ws.on('close', () => {
        console.log(`The client has connected`);
    })


    ws.onerror = function () {
        console.log('Some error');
    }

});

console.log('Running on 5010');