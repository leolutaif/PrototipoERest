import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('sua-chave-publica-do-stripe'); // Substitua pela sua chave pública do Stripe

function PaymentForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const stripe = await stripePromise;

        // Exemplo: Criar uma sessão de checkout no seu backend
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payment_method_types: ['card'], // Métodos de pagamento desejados (por exemplo, 'card', 'pix', etc.)
                amount: 10000, // Valor em centavos (por exemplo, R$ 100,00)
                currency: 'BRL', // Moeda
            }),
        });

        const session = await response.json();

        // Redirecionar para a página de checkout do Stripe
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Pagar com Stripe</button>
        </form>
    );
}