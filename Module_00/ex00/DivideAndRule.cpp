#include <iostream>
#include <vector>

class Account
{
	int id;
	int value;

	Account() : id(-1),	value(0)
	{	}


	//Getters
	int getId() {
		return this->id;
	}

	int getValue() {
		return this->value;
	}

	//Setters
	

	friend std::ostream &operator<<(std::ostream &p_os, const Account &p_account)
	{
		p_os << "[" << p_account.id << "] - [" << p_account.value << "]";
		return (p_os);
	}
};

class Bank
{
	int liquidity;
	std::vector<Account *> clientAccounts;

	Bank() : liquidity(0)
	{
	}

	//Getters
	const Account*  getAccount(int id) {
		return clientAccounts[id];
	}


	//Setters

	friend std::ostream &operator<<(std::ostream &p_os, const Bank &p_bank)
	{
		p_os << "Bank informations : " << std::endl;
		p_os << "Liquidity : " << p_bank.liquidity << std::endl;
		for (auto &clientAccount : p_bank.clientAccounts)
			p_os << *clientAccount << std::endl;
		return (p_os);
	}
};

int main()
{
	Account accountA = Account();
	accountA.id = 0;
	accountA.value = 100;

	Account accountB = Account();
	accountB.id = 1;
	accountB.value = 100;

	Bank bank = Bank();
	bank.liquidity = 999;
	bank.clientAccounts.push_back(&accountA);
	bank.clientAccounts.push_back(&accountB);

	bank.liquidity -= 200;
	accountA.value += 400;

	std::cout << "Account : " << std::endl;
	std::cout << accountA << std::endl;
	std::cout << accountB << std::endl;

	std::cout << " ----- " << std::endl;

	std::cout << "Bank : " << std::endl;
	std::cout << bank << std::endl;

	return (0);
}
