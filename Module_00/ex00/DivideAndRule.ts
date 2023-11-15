class Account {
	private _value: number;
	
	private constructor(private _id: number) {
		this._value = 0;
	}

	static createAccount(id: number): Account {
		if (id < 0) {
			throw new Error("Error: id cannot be negative")
		}
		return new Account(id);
	}

	//Getters
	get id(): number {
		return this._id;
	}

	get value(): number {
		return this._value;
	}

	makeDeposit(amount: number): void {
		if (amount < 0) {
			throw new Error("Error: the deposit cannot be negative amount")
		}
		this._value += amount;
	}

};

class Bank
{
	private _liquidity: number;
	private _clientsAccounts: Account[];
	private _nextId: number = 0;

	constructor() {
		this._liquidity = 0;
		this._clientsAccounts = [];
	}

	//Getters
	get liquidity(): number {
		return this._liquidity;
	}

	get clientsAccounts(): Account[] {
		return this._clientsAccounts;
	}

	getAccount(id: number): Account|undefined {
		for (let i = 0; i < this._clientsAccounts.length; i++) {
			if (this._clientsAccounts[i].id == id) {
				return this._clientsAccounts[i];
			}
		}
		return undefined;
	}

	//Setters

	//Methods
	createAccount(): number {
		const currentId = this._nextId;
		this._clientsAccounts.push(Account.createAccount(currentId))
		this._nextId++;
		return currentId;
	}

	makeDeposit(id: number, amount: number): boolean {
		if (amount <= 0) {
			throw new Error("Error: the deposit cannot be negative amount");
		}
		const fees = amount * 0.05;
		this._liquidity += fees;
		let acc = this.getAccount(id);
		if (acc) {
			acc.makeDeposit(amount - fees)
			return true;
		} else {
			throw new Error("Error: account doesnt exist");
		}
	}

	deleteAccount(id: number): boolean {
		for (let i = 0; i < this._clientsAccounts.length; i++) {
			if (this.clientsAccounts[i].id == id) {
				this.clientsAccounts.splice(i, 1);
				return true;
			}
		}
		throw new Error("Error: account doesnt exist");
	}

};

function main() {
	let bank = new Bank();

	console.log(bank.liquidity);
	console.log(bank.clientsAccounts);
	
	bank.createAccount();
	bank.createAccount();
	bank.createAccount();
	bank.createAccount();
	
	console.log(bank.clientsAccounts);

	bank.makeDeposit(1, 100);
	console.log(bank.getAccount(1)?.value);
	console.log(bank.getAccount(0)?.value);
}


main();