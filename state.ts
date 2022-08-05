interface State {
	order: Order;

	cancelOrder(): void;
	verifyPayment(): void;
	shipOrder(): void;
}

class Order {
	public cancelledOrderState: State;
	public paymentPendingState: State;
	public orderShippedState: State;
	public orderBeingPreparedState: State;

	currentState: State;

	constructor () {
		this.cancelledOrderState = new CancelledOrderState(this);
		this.paymentPendingState = new PaymentPendingState(this);
		this.orderShippedState = new OrderShippedState(this);
		this.orderBeingPreparedState = new OrderBeingPreparedState(this);

		this.setState(this.paymentPendingState);
	}

	setState(state: State): void {
		this.currentState = state;
	}

	getState(): State {
		return this.currentState;
	}
}

class PaymentPendingState implements State {
	order: Order;

	constructor(order: Order) {
		this.order = order;
	}

	cancelOrder(): void {
		console.log('cancelling your unppaid order');
		this.order.setState(this.order.cancelledOrderState);
	}
	verifyPayment(): void {
		console.log('Payment verified! Shipping soon.');
		this.order.setState(this.order.orderBeingPreparedState);
	}
	shipOrder(): void {
		console.log('we cannot ship the order yet.');
	}
}

class CancelledOrderState implements State {
	order: Order;

	constructor(order: Order) {
		this.order = order;
	}

	cancelOrder(): void {
		console.log('your order has already been cancelled');
	}
	verifyPayment(): void {
		console.log('your order has been cancelled');
	}
	shipOrder(): void {
		console.log('your order has been cancelled');
	}
}

class OrderBeingPreparedState implements State {
	order: Order;

	constructor(order: Order) {
		this.order = order;
	}

	cancelOrder(): void {
		console.log('Cancelling your order');
		this.order.setState(this.order.cancelledOrderState);
	}
	verifyPayment(): void {
		console.log('Already verified your payment.');
	}
	shipOrder(): void {
		console.log('shipping your order now');
		this.order.setState(this.order.orderShippedState);
	}
}

class OrderShippedState implements State {
	order: Order;

	constructor(order: Order) {
		this.order = order;
	}

	cancelOrder(): void {
		console.log('order already shipped, you cannot cancel');
	}
	verifyPayment(): void {
		console.log('order already shipped');
	}
	shipOrder(): void {
		console.log('order already shipped');
	}
}

let order = new Order();

console.log('Order state: ', (<any>order.getState()).constructor.name);

order.getState().verifyPayment();

console.log('Order state: ', (<any>order.getState()).constructor.name);
