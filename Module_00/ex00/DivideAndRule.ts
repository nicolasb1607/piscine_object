class Account {
	private  _value: number;;
	
	constructor(private _id: number) {
		this._value = 0;
	}

	//Getters
	get id(): number {
		return this._id;
	}

	get value(): number {
		return this._value;
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
		this._clientsAccounts.push(new Account(currentId))
		this._nextId++;
		return currentId;
	}

	deposit(id: number, amount: number): boolean {
		if (!this.checkExistingAccount(id)) {
			throw new Error("Error: account doesnt exist");
		}
		if (amount <= 0) {
			throw new Error("Error: the deposit cannot be negative amount");
		}
		return true;
	}


	checkExistingAccount(id: number): boolean {
		for (let i = 0; i < this._clientsAccounts.length; i++) {
			if (this._clientsAccounts[i].id == id) return true;
		}
		return false;
	}

};



function main() {
	console.log("Hello World");
}


main();