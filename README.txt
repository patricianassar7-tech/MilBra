MILBRA 3.0 — CÉREBRO DE IA REAL

Agora o projeto tem duas partes:
1. O aplicativo (pasta public/)
2. O servidor secreto (server.js), que conversa com a IA.

COMO ATIVAR O CÉREBRO

1. Instale o Node.js no computador.
2. Abra esta pasta no Terminal.
3. Rode:
   npm install

4. Crie uma chave de API no provedor OpenAI.
5. Faça uma cópia de ".env.example" chamada ".env".
6. Dentro de ".env", troque:
   OPENAI_API_KEY=coloque_sua_chave_aqui
   pela chave real.

7. Rode:
   npm start

8. Abra:
   http://localhost:3000

Quando estiver certo, no topo do MilBra aparecerá:
"CÉREBRO CONECTADO"

IMPORTANTE
- A chave fica SOMENTE no servidor.
- Não coloque a chave dentro do index.html.
- Para usar no celular fora do computador, publique este projeto em um servidor HTTPS.
- O uso da API pode gerar custos na conta do provedor.

MODELO
O projeto vem configurado com gpt-5.6-luna para economizar.
Você pode trocar OPENAI_MODEL no .env por outro modelo disponível na sua conta.
