#include<iostream>
#include<vector>
#include "driver.hpp"
using namespace std;

class Rider{
    friend class Scheduler;
    public:

        Rider(string name, int timetable[2][5], int flexibility[2]){

        for(int i = 0; i < 2; i++){
            for(int j = 0; j < 5; j++){
                this->timetable[i][j] = timetable[i][j];
            }
            this->flexibility[i] = flexibility[i];
        }
        this->name = name;
        trips = 0;
    }

    void print(){
        cout<< "Rider Name: " << name << endl;
        
        for(int i = 0; i < 5; i++){
            //Day
            cout << "DAY " << i+1 << endl;
            for(int j = 0; j < 2; j++){
                //Trip
                cout << "TRIP " << j << endl;
                vector<Driver*> drs = this->driveMap[j][i];
                if(drs.empty() ) cout << "      No Driver Found!" << endl;
                for(int k = 0; k < drs.size(); k++){
                    cout << "   ";   drs[k]->print(1);
                }
            }
        }

        for(int i = 0; i< 2; i++){
            for(int j = 0; j < 5; j++){
                cout << timetable[i][j] << " ";
            }
            cout << endl;
        }   cout << endl << endl;

    }

    private:
    string name;
    //name, section, batch registration details num location

    vector<Driver*> driveMap[2][5];
    int matchScore, exactScore, dayScore, trips;
    int timetable[2][5];
    int flexibility[2];

};
