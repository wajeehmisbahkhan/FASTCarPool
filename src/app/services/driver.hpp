#include<iostream>
using namespace std;

class Vehicle{
    friend class Driver;
    friend class Scheduler;
    public:

        Vehicle(){
            for(int i = 0; i < 2; i++){
                for(int j = 0; j < 5; j++){
                    capacity[i][j] = 4;
                }
            }
            this->cap = 4;
        }

        Vehicle(string name, long int fare, int cap){
            this->name = name;
            this->fare = fare;
            for(int i = 0; i < 2; i++){
                for(int j = 0; j < 5; j++){
                    capacity[i][j] = cap;
                }
            }
            this->cap = cap;
        }

    private:
        string name;    //details
        long int fare;
        int capacity[2][5], cap;

};

class Driver{
    friend class Scheduler;
    public:

        Driver(string name, int timetable[2][5], int flexibility[2]){
        //abstracted from drivers class with relevant stuff only
        for(int i = 0; i < 2; i++){
            for(int j = 0; j < 5; j++){
                this->timetable[i][j] = timetable[i][j];
            }
            this->flexibility[i] = flexibility[i];
        }
        this->name = name;
        matchScore = 0; exactScore = 0; dayScore = 0;

        vehicle = new Vehicle();
    }

    void print(bool x = false){
        cout<< "Driver Name: " << name << endl;
        if(x)   return;
        cout << matchScore << exactScore << dayScore << endl << endl;
        for(int i = 0; i< 2; i++){
            for(int j = 0; j < 5; j++){
                cout << timetable[i][j] << " ";
            }
            cout << endl;
        }   cout << endl << endl;
        for(int i = 0; i< 2; i++){
            for(int j = 0; j < 5; j++){
                cout << vehicle->capacity[i][j] << " ";
            }
            cout << endl;
        }   cout << endl << endl;

    }

    private:
    string name;
    //name, section, batch registration details num etc
    //location
    //fare and stuff in a vehicle object
    Vehicle* vehicle;
    int matchScore, exactScore, dayScore, total;
    int timetable[2][5];
    int flexibility[2];

    void calculateTotalScore(){
        total = matchScore*1000 + dayScore*100 + exactScore;
    }

};