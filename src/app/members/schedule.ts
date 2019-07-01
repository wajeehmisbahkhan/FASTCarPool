import { Rider, Driver } from '../services/helper-classes';
class Scheduler {

    assignDriver(rider: Rider) {
        let maxDriver: Driver = null;
        let newDriver: Driver = null;
        let index = 0;
        for (let j = 0; j < 5; j++) {

            for (let k = 0; k < 2; k++) {

                if (rider.driveMap[k][j].length === 0)   continue;

                for (let d = 0; d < rider.driveMap[k][j].length; d++) {
                    newDriver = rider.driveMap[k][j][d];
                    if (maxDriver === null || newDriver.total > maxDriver.total) {
                      maxDriver = newDriver;    index = d;
                    }
                }
                // Swap
                if (index) {
                    newDriver = rider.driveMap[k][j][0];
                    rider.driveMap[k][j][0] = rider.driveMap[k][j][index];
                    rider.driveMap[k][j][index] = newDriver;
                }


                for (let d = 1; d < rider.driveMap[k][j].length; d++) {
                    newDriver = rider.driveMap[k][j][d];
                        newDriver.matchScore--;
                        newDriver.calculateTotalScore();
                }
                maxDriver.print(true);
                rider.driveMap[k][j].slice(0, 1);
                maxDriver.vehicle.filled[k][j]--;
                maxDriver = null;
            }
        }
    }

    scoreDriver(rider: Rider, driver: Driver) {
        for (let j = 0; j < 5; j++) {
            // Arrival
            let match = false;
            let diff: number;
            if (driver.vehicle.filled[0][j]) {
                diff = driver.timetable[0][j] - rider.timetable[0][j];
                if (diff > 0) {
                    // Rider has to arrive earlier
                    if (diff <= driver.flexibility[0]) {
                        driver.matchScore++;   // driver can arrive early
                        match = true;
                        if (rider.driveMap[0][j].length === 0) rider.trips++;
                        rider.driveMap[0][j].push(driver);
                    }
                } else if (diff < 0) {
                    // Driver has to arrive earlier
                    if ((-1) * diff <= rider.flexibility[0]) {
                        driver.matchScore++;   // rider can arrive early
                        match = true;
                        if (rider.driveMap[0][j].length === 0) rider.trips++;
                        rider.driveMap[0][j].push(driver);
                    }
                } else {
                    // exactMatch
                    driver.matchScore++;
                    driver.exactScore++;
                    match = true;
                    if (rider.driveMap[0][j].length === 0) rider.trips++;
                    rider.driveMap[0][j].push(driver);
                }

            }

            // Departure
            if (driver.vehicle.filled[1][j]) {
                diff = driver.timetable[1][j] - rider.timetable[1][j];
                if (diff > 0) {
                    // Driver has to depart later
                    if (diff <= rider.flexibility[1]) {
                        driver.matchScore++;   // rider can depart late
                        driver.dayScore += 1 * Number(match);
                        if (rider.driveMap[0][j].length === 0) rider.trips++;
                        rider.driveMap[1][j].push(driver);
                    }
                } else if (diff < 0) {
                    // Rider has to depart later
                    if ((-1) * diff <= driver.flexibility[1]) {
                        driver.matchScore++;   /// driver can depart late
                        driver.dayScore += 1 * Number(match);
                        if (rider.driveMap[0][j].length === 0) rider.trips++;
                        rider.driveMap[1][j].push(driver);
                    }
                } else {
                    // exactMatch
                    driver.matchScore++;   driver.exactScore++;
                    driver.dayScore += 1 * Number(match);
                    if (rider.driveMap[0][j].length === 0) rider.trips++;
                    rider.driveMap[1][j].push(driver);
                }
            }

        }
        driver.calculateTotalScore();
        // driver.print(1);   cout  << driver.total << endl;

    }

    schedule (rider: Rider, drivers: Array<Driver>) {

        for (let i = 0; i < drivers.length; i++) {
            const driver = drivers[i];
            this.scoreDriver(rider, driver);
        }
        // if(rider.trips != 10){    exit(69);}
        this.assignDriver(rider);
    }
}

const rtt = function (timetable: Array<Array<number>>) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
            do {
              timetable[i] = [];
              timetable[i][j] = Math.floor(Math.random() * 10) % 8 + 8 + i;
            } while (i === 1 && timetable[i][j] <= timetable[0][j] );
        }
    }
    return timetable;
};

export const main = function() {
    let timetable = new Array<Array<number>>();
    timetable = rtt(timetable);
    const flexibility = [1, 1];
    const drivers = new Array<Driver>();
    const rider = new Rider('Azazel', timetable, flexibility);

    for (let i = 0; i < 10; i++) {
        let name = 'DR';
        name += i; // What is this?
        rtt(timetable);
        const newUser = new Driver(name, timetable, flexibility);
        drivers.push(newUser);
    }
    const scheduler = new Scheduler;
    scheduler.schedule(rider, drivers); // How to run?
    rider.print();
    for (let i = 0; i < drivers.length; i++) {
        drivers[i].print(false);
    }
};

main();
