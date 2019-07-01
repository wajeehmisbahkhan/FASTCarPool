#include<iostream>
#include<vector>
#include<cstdlib>
#include<ctime>
#include<string> 
#include <sstream>
#include "rider.hpp"

using namespace std;

class Scheduler{
    public:

    static void assignDriver(Rider* rider){
        Driver *maxDriver = nullptr, *newDriver;    int index = 0;
        for(int j =0; j < 5; j++){

            for(int k = 0; k < 2; k++){

                if(rider->driveMap[k][j].empty())   continue;

                for(int d = 0; d < rider->driveMap[k][j].size(); d++){
                    newDriver = rider->driveMap[k][j][d];
                    if(maxDriver == nullptr || newDriver->total > maxDriver->total){
                      maxDriver = newDriver;    index = d;
                    }
                }
                //swap
                if(index){
                    newDriver = rider->driveMap[k][j][0];
                    rider->driveMap[k][j][0] = rider->driveMap[k][j][index];
                    rider->driveMap[k][j][index] = newDriver;
                }


                for(int d = 1; d < rider->driveMap[k][j].size(); d++){
                    newDriver = rider->driveMap[k][j][d];
                        newDriver->matchScore--;
                        newDriver->calculateTotalScore();
                }
                maxDriver->print(1);
                rider->driveMap[k][j].resize(1);
                maxDriver->vehicle->capacity[k][j]--;
                maxDriver = nullptr;
            }
        }
    }

    static void scoreDriver(Rider* rider, Driver* driver){
        
        for(int j = 0; j < 5; j++){
                //Arrival0
                bool match = false;     int diff;
                if(driver->vehicle->capacity[0][j]){
                    diff = driver->timetable[0][j] - rider->timetable[0][j];
                    if(diff > 0){
                        //Rider has to arrive earlier
                        if(diff <= driver->flexibility[0]){
                            driver->matchScore++;   //driver can arrive early
                            match = 1;  if(rider->driveMap[0][j].empty()) rider->trips++;
                            rider->driveMap[0][j].push_back(driver);
                        }
                    }
                    else if(diff < 0){
                        //Driver has to arrive earlier
                        if((-1)*diff <= rider->flexibility[0]){
                            driver->matchScore++;   //rider can arrive early
                            match = 1;  if(rider->driveMap[0][j].empty()) rider->trips++;
                            rider->driveMap[0][j].push_back(driver);
                        }
                    }
                    else{
                        //exactMatch
                        driver->matchScore++;   driver->exactScore++;
                        match = 1;  if(rider->driveMap[0][j].empty()) rider->trips++;
                        rider->driveMap[0][j].push_back(driver);
                    }

                }

                //Departure
                if(driver->vehicle->capacity[1][j]){
                    diff = driver->timetable[1][j] - rider->timetable[1][j];
                    if(diff > 0){
                        //Driver has to depart later
                        if(diff <= rider->flexibility[1]){
                            driver->matchScore++;   //rider can depart late
                            driver->dayScore += 1 * match;
                            if(rider->driveMap[0][j].empty()) rider->trips++;
                            rider->driveMap[1][j].push_back(driver);
                        }
                    }
                    else if(diff < 0){
                        //Rider has to depart later
                        if((-1)*diff <= driver->flexibility[1]){
                            driver->matchScore++;   ///driver can depart late
                            driver->dayScore += 1 * match;
                            if(rider->driveMap[0][j].empty()) rider->trips++;
                            rider->driveMap[1][j].push_back(driver);
                        }
                    }
                    else{
                        //exactMatch
                        driver->matchScore++;   driver->exactScore++;
                        driver->dayScore += 1 * match;
                        if(rider->driveMap[0][j].empty()) rider->trips++;
                        rider->driveMap[1][j].push_back(driver);
                    }

                }

            }
            driver->calculateTotalScore();
            //driver->print(1);   cout  << driver->total << endl; 

    }

    static void schedule(Rider* rider, vector<Driver*> drivers){

        for(int i = 0; i < drivers.size(); i++){
            Driver* driver = drivers[i];
            scoreDriver(rider, driver);
        }
        //if(rider->trips != 10){    exit(69);}
        assignDriver(rider);
    }
};

void rtt(int timetable[2][5]){
    for(int i = 0; i < 2; i++){
        for(int j = 0; j < 5; j++){
            do{
                timetable[i][j] = rand() % 8 + 8 + i;
            }while(i==1 && timetable[i][j] <= timetable[0][j]);
        }
    }
}

main(){
    cout << "YO!" << endl;  srand(time(0));
    int timetable[2][5];  rtt(timetable);
    int flexibility[2] = {1, 1};
    vector<Driver*> drivers;
    Rider *rider = new Rider("Azazel", timetable, flexibility);

    for(int i = 0; i < 10; i++){
        string name = "DR"; name.append(to_string(i));
        rtt(timetable);
        Driver *newUser = new Driver(name, timetable, flexibility);
        drivers.push_back(newUser);
    }
    Scheduler::schedule(rider, drivers);
    rider->print();
    for(int i = 0; i < drivers.size(); i++){
        drivers[i]->print();
    }
    
    
}