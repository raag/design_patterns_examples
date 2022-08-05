const PIANO = 1;
const VIOLIN = 2;

interface Instrument {
    tune(): void;
    play(): void;
}

class Piano implements Instrument {
    tune(): void {
        console.log('tuning piano');
    }

    play(): void {
        console.log('playing piano');
    }
}

class Violin implements Instrument {
    tune(): void {
        console.log('tuning violin');
    }

    play(): void {
        console.log('playing violin');
    }
}

class InstrumentFactory {
    static make(instrumentType: number): Instrument {
        switch (instrumentType) {
            case PIANO:
                return new Piano();
            case VIOLIN:
                return new Violin();
            default:
                throw 'instrument not found';
        }
    }
}


class Main {
    playMusic(instrumentType: number): void {
        const instrument = InstrumentFactory.make(instrumentType);
        instrument.tune();
        instrument.play();
    }
}

new Main().playMusic(PIANO);
new Main().playMusic(VIOLIN);
