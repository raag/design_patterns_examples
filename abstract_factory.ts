interface CPU {
	proccess(): void;
}

interface RAM {
	loadData(): void;
}

interface Computer {
	cpu: CPU;
	ram: RAM;
	
	boot(): void;
}

interface ComputerFactory {
	createCPU(): CPU;
	createRAM(): RAM;
	createComputer(cpu: CPU, ram: RAM): Computer;
}


class DesktopCPU implements CPU {
	proccess(): void {
		console.log('Desktop: proccessing...');
	}
}


class DesktopRAM implements RAM {
	loadData(): void {
		console.log('Desktop: loading data...');
	}
}

class DesktopComputer implements Computer {
	cpu: CPU;
	ram: RAM;

	constructor(cpu: CPU, ram: RAM) {
		this.cpu = cpu;
		this.ram = ram;
	}

	boot(): void {
		console.log('Booting desktop');
		this.cpu.proccess();
		this.ram.loadData();
	}
}


class LaptopCPU implements CPU {
	proccess(): void {
		console.log('Laptop: proccessing...');
	}
}


class LaptopRAM implements RAM {
	loadData(): void {
		console.log('Laptop: loading data...');
	}
}

class LaptopComputer implements Computer {
	cpu: CPU;
	ram: RAM;

	constructor(cpu: CPU, ram: RAM) {
		this.cpu = cpu;
		this.ram = ram;
	}

	boot(): void {
		console.log('Booting laptop');
		this.cpu.proccess();
		this.ram.loadData();
	}
}

class DesktopFactory implements ComputerFactory {
	createCPU(): CPU {
		return new DesktopCPU();
	}

	createRAM(): RAM {
		return new DesktopRAM();
	}

	createComputer(cpu: CPU, ram: RAM): Computer {
		return new DesktopComputer(cpu, ram);
	}
}

class LaptopFactory implements ComputerFactory {
	createCPU(): CPU {
		return new LaptopCPU();
	}

	createRAM(): RAM {
		return new LaptopRAM();
	}

	createComputer(cpu: CPU, ram: RAM): Computer {
		return new LaptopComputer(cpu, ram);
	}
}

class Application {
	main(factory: ComputerFactory): void {
		const cpu = factory.createCPU();
		const ram = factory.createRAM();
		const computer = factory.createComputer(cpu, ram);

		computer.boot();
	}
}


const DESKTOP_TYPE = 1;
const LAPTOP_TYPE = 2;

let computer_type = LAPTOP_TYPE;

let factory: ComputerFactory  ;

switch(computer_type) {
	case DESKTOP_TYPE:
		factory = new DesktopFactory();
		break;
	case LAPTOP_TYPE:
		factory = new LaptopFactory();
		break;
	default:
		throw 'Computer type not implemented';
}

const application = new Application();
application.main(factory);
