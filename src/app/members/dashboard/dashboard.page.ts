import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink, User } from 'src/app/services/helper-classes';
import { ChatService } from 'src/app/services/chat.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  // Menu
  public appPages = [
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'mail'
    }
  ];

  // Map reference
  @ViewChild('map') map;
  // Map location
  lat = 0;
  lng = 0;
  updated = false;
  // Marker Location
  liveLat = 0;
  liveLng = 0;

  constructor(
    private authService: AuthenticationService,
    public db: DatabaseService,
    private router: Router,
    private cs: ChatService,
    private alertService: AlertService
  ) {
    // Load all chats live
    db.getLiveDoc(`users/${db.userLink.email}`).subscribe(
      doc => db.userData.chats = doc.payload.data()['chats'],
      err => this.alertService.error.bind(this.alertService, err)
    );
    // Update all messages within chats
    cs.loadMessages();
    // PICKUPS
    // this.makePickup(24.934478, 67.177173, 'Malir Cantt Gate 6 Phase II');
    // this.makePickup(24.940228, 67.18198, 'Askari 5');
    // this.makePickup(24.961253, 67.187153, 'Phase 1');
    // this.makePickup(24.954533, 67.180362, 'Falcon');
    // this.makePickup(24.948738, 67.214524, 'CMH');
    // this.makePickup(24.931672, 67.204522, 'X20');
    // this.makePickup(24.928067, 67.204628, 'Cantt Bazar');
    // this.makePickup(24.925115, 67.202414, 'Malir Cantt Gate #2');
    // this.makePickup(24.950412, 67.1068, 'Fariya Chowke');
    // this.makePickup(24.954445, 67.117268, 'Kaneez Fatima');
    // this.makePickup(24.957601, 67.121253, 'Madras Choke');
    // this.makePickup(24.951597, 67.131382, 'Suchal Goath');
    // this.makePickup(24.955852, 67.134924, 'Kiran Hospital');
    // this.makePickup(24.951857, 67.140102, 'Chapal Garden');
    // this.makePickup(24.895306, 67.212212, 'Malir');
    // this.makePickup(24.9125912, 67.1398402, 'Sindh Baloch');
    // this.makePickup(24.923641, 67.137724, 'Kamran Chowrangi');
    // this.makePickup(24.920396, 67.134292, 'Munawar Chowrangi');
    // this.makePickup(24.916553, 67.130302, 'Rado Center');
    // this.makePickup(24.914032, 67.127501, 'Darul Sehat');
    // this.makePickup(25.0188857, 66.9766756, 'Maymar Mobile Mall');
    // this.makePickup(24.948403, 67.090934, 'Al Asif');
    // this.makePickup(24.9422, 67.096592, 'Paradise Bakery');
    // this.makePickup(24.934926, 67.105316, 'Maskan');
    // this.makePickup(24.929155, 67.097531, 'Disco Bakery');
    // this.makePickup(24.910761, 67.105306, 'Aladin');
    // this.makePickup(24.906696, 67.111199, 'Lasania');
    // this.makePickup(24.900868, 67.11631, 'Askari 4');
    // this.makePickup(25.006514, 67.0641, '4K Stop');
    // this.makePickup(25.000641, 67.064861, '2 Minute');
    // this.makePickup(24.98527, 67.06543, 'Power House');
    // this.makePickup(24.978579, 67.066708, 'Saleem Center');
    // this.makePickup(24.972588, 67.066634, 'UP-More');
    // this.makePickup(24.966045, 67.067371, 'Nagan (DahliHall)');
    // this.makePickup(24.962792, 67.053765, 'Shadman2-1');
    // this.makePickup(24.959528, 67.050178, 'Sakhi Hassan');
    // this.makePickup(24.947471, 67.065896, 'DC Office');
    // this.makePickup(24.9328, 67.082907, 'UBL Sports(KIHD)');
    // this.makePickup(24.985161, 67.055121, 'Ajmair Nagri');
    // this.makePickup(24.978726, 67.0555, 'Bara Dari');
    // this.makePickup(24.955192, 67.058664, 'Babul Islam');
    // this.makePickup(24.971885, 67.056017, 'Disco More');
    // this.makePickup(24.964608, 67.067094, 'Al Habib');
    // this.makePickup(24.951333, 67.005478, 'Kalandria');
    // this.makePickup(24.936616, 67.055147, 'Landi Kotal');
    // this.makePickup(24.93243, 67.059299, 'Tahir Villas');
    // this.makePickup(24.927419, 67.064404, 'Ayesha Manzil');
    // this.makePickup(24.930534, 67.071653, 'Naseerabad');
    // this.makePickup(24.948283, 67.040367, 'Shipowner');
    // this.makePickup(24.942595, 67.047492, '5 Star');
    // this.makePickup(24.947656, 67.051718, 'Farooq-e-Azam');
    // this.makePickup(24.947155, 67.052585, 'Mateen Food');
    // this.makePickup(24.941094, 67.060381, 'Niaz Manzil');
    // this.makePickup(24.94261, 67.06193, 'Dental College');
    // this.makePickup(24.936819, 67.075986, 'Gulberg');
    // this.makePickup(24.96492, 67.053357, 'Anda More');
    // this.makePickup(24.971885, 67.056017, 'Disco More');
    // this.makePickup(24.960589, 67.072985, 'Café 2 days');
    // this.makePickup(24.938021, 67.085555, 'Fazal Mill');
    // this.makePickup(24.893814, 67.030667, 'Bara Board');
    // this.makePickup(24.901624, 67.03011, 'Golimar Chowrangi');
    // this.makePickup(24.910939, 67.030739, 'Petrol Pump');
    // this.makePickup(24.910104, 67.039885, '4# Liaquatabad');
    // this.makePickup(24.909338, 67.048472, '10# LaluKhait');
    // this.makePickup(24.90817, 67.061921, 'Baloch Hotel');
    // this.makePickup(24.901103, 67.072968, 'Hassan Square');
    // this.makePickup(24.904838, 67.079146, 'Mumtaz Manzil');
    // this.makePickup(24.908587, 67.084079, 'Baitul Mukaram');
    // this.makePickup(24.91133, 67.094277, 'Urdu Science');
    // this.makePickup(24.908394, 67.109281, 'Lal Flate');
    // this.makePickup(24.873023, 67.022105, 'Garden PSO Pump');
    // this.makePickup(24.876843, 67.03091, 'Soldier Bazar 1,2,3');
    // this.makePickup(24.880543, 67.039768, 'Guromander');
    // this.makePickup(24.885032, 67.056977, 'Jail Chorangi');
    // this.makePickup(24.889253, 67.061191, 'New Town');
    // this.makePickup(24.888773, 67.065549, 'Liaquat Library');
    // this.makePickup(24.888326, 67.086611, 'Peer Pagara Road');
    // this.makePickup(24.865049, 67.023619, 'Gull Plaza');
    // this.makePickup(24.866468, 67.027371, '7 Day');
    // this.makePickup(24.873049, 67.036527, 'Numaish');
    // this.makePickup(24.868056, 67.052539, 'Noorani');
    // this.makePickup(24.881477, 67.063469, 'Khalid Bin Walid (Medicare)');
    // this.makePickup(24.884008, 67.064465, 'Sharfabad');
    // this.makePickup(24.882394, 67.06728, 'Bahadurabad');
    // this.makePickup(24.890298, 67.072096, 'Agha Khan H.');
    // this.makePickup(24.893613, 67.088223, 'Dalmian (Bahria Uni)');
    // this.makePickup(24.871117, 67.094426, 'Karachi Auditorium');
    // this.makePickup(24.883069, 67.02652, 'Ali bhai');
    // this.makePickup(24.87016, 66.988609, 'Jamat Khana');
    // this.makePickup(24.881784, 67.033714, 'Fatimeet');
    // this.makePickup(24.86793, 67.05241, 'Noori Kabab');
    // this.makePickup(24.860532, 67.032146, 'Zahid Nehari');
    // this.makePickup(24.872126, 67.059917, 'Laberty');
    // this.makePickup(24.872097, 67.070256, 'Hill Park');
    // this.makePickup(24.883495, 67.082188, 'Zubaida Hospital');
    // this.makePickup(24.834133, 67.033652, '3 Talwar');
    // this.makePickup(24.843838, 67.04022, 'Cantt Station');
    // this.makePickup(24.849174, 67.050121, 'Kala Pull');
    // this.makePickup(24.848186, 66.995363, 'Tower');
    // this.makePickup(24.815534, 67.020258, 'Bilawal House');
    // this.makePickup(24.817407, 67.040236, 'Zamzama');
    // this.makePickup(24.819380, 67.045720, 'Gizri');
    // this.makePickup(24.823085, 67.058668, 'Phase 4');
    // this.makePickup(24.807343, 67.076992, 'Khayaban-e-Itehad');
    // this.makePickup(24.820412, 67.125101, 'Nasir Jump');
    // this.makePickup(24.831671, 67.173072, 'Landhi #6');
    // this.makePickup(24.838010, 67.181873, 'Landhi #4');
    // this.makePickup(24.844792, 67.197861, 'Landhi #1');
    // this.makePickup(24.784955, 67.065771, '26th Street');
    // this.makePickup(24.793059, 67.064710, 'Kh.Bukhari');
    // this.makePickup(24.808497, 67.061739, 'Shahbaz');
    // this.makePickup(24.829687, 67.074113, 'Xect Stop');
    // this.makePickup(24.831417, 67.076968, 'HinoBridge');
    // this.makePickup(24.867147, 67.082997, 'Singer Ch.');
    // this.makePickup(24.893421, 67.043834, 'Teen Hatti');
    // this.makePickup(24.927602, 67.064483, 'Ayesha Manzil');
    // this.makePickup(24.935812, 67.075522, 'Water Pump');
    // this.makePickup(24.918617, 67.030721, '7# Nazimabad');
    // this.makePickup(24.920216, 67.029677, 'Abbasi Hospital');
    // this.makePickup(24.922226, 67.024212, 'KhalafatChowke');
    // this.makePickup(24.928458, 67.024032, 'Abdullah College');
    // this.makePickup(24.951748, 67.002513, 'Orangi Town');
    // this.makePickup(24.921502, 67.050358, 'Mosa Colony');
    // this.makePickup(24.914349, 67.056928, 'Usman Memorial');
    // this.makePickup(24.897796, 67.077079, 'DC Office');
    // this.makePickup(24.882578, 67.355984, 'Gulshan-e-Hadeed');
    // this.makePickup(24.862922, 67.336711, 'Steel Town');
    // this.makePickup(24.872938, 67.291769, 'Razaqabad');
    // this.makePickup(24.932593, 67.155116, 'Comander CNG Pump');
    // this.makePickup(24.942917, 67.150503, 'Safoora');
    // this.makePickup(24.933983, 67.177425, 'Cantt Gate 2');
    // this.makePickup(24.927707, 67.203264, 'Cantt Gate');
    // this.makePickup(24.903156, 67.182185, 'Model More');
    // this.makePickup(24.901899, 67.190030, 'Model Colony');
    // this.makePickup(24.893387, 67.194334, 'Saudabad');
    // this.makePickup(24.879018, 67.188486, 'Malir 15');
    // this.makePickup(24.859214, 67.017572, 'Urdu Bazar');
    // this.makePickup(24.86076, 67.024159, 'Regal');
    // this.makePickup(24.856796, 67.030682, 'Sarawan');
    // this.makePickup(24.857308, 67.033193, 'Lucky Star');
    // this.makePickup(24.855429, 67.040002, 'Regent Plaza');
    // this.makePickup(24.858763, 67.050324, 'FTC');
    // this.makePickup(24.860607, 67.062839, 'Nursery');
    // this.makePickup(24.862432, 67.06972, 'Lal Kothi');
    // this.makePickup(24.883961, 67.115791, 'PAF Base Faisal');
    // this.makePickup(24.887068, 67.125535, 'Dig Road');
    // this.makePickup(24.887344, 67.155995, 'Star Gate');
    // this.makePickup(24.885526, 67.167993, 'Wireless Gate');
    // this.makePickup(24.884407, 67.175378, 'Malir Halt');
    // this.makePickup(24.936800, 67.031360, 'Asghar Ali Std');
    // this.makePickup(24.944173, 67.031341, 'Katti Pahari');
    // this.makePickup(24.923312, 67.068043, 'Muka Chowke');
    // this.makePickup(24.920423, 67.070867, 'Bhijan Choke');
    // this.makePickup(24.916562, 67.081454, '13D1Signal');
    // this.makePickup(24.920454, 67.086561, 'Mochi More');
    // this.makePickup(24.931289, 67.037070, 'KDA');
    // this.makePickup(24.937063, 67.042261, 'Haydri');
    // this.makePickup(24.961776, 67.070571, 'Al Habib');
    // this.makePickup(24.959513, 67.074589, 'Namak Bank');
    // this.makePickup(24.918588, 67.129594, 'Johar Mor');
    // this.makePickup(24.907946, 67.119138, 'Hill Top');
    // this.makePickup(24.905789, 67.116395, 'Perfume Chowke');
    // this.makePickup(24.912153, 67.125686, 'Johar Chowrangi');
    // this.makePickup(24.937416, 67.144295, 'Mosmiyat');
    // this.makePickup(24.891683, 67.177928, 'Security Printing');
    // this.makePickup(24.938205, 67.150186, 'Johar Complex');
    // this.makePickup(24.917428, 67.097471, 'NIPA');
    // this.makePickup(24.925555, 67.107851, 'Safari Park');
    // this.makePickup(24.928503, 67.111856, 'Samama');
    // this.makePickup(24.923200, 67.117286, 'Continental');
    // this.makePickup(24.939230, 67.159053, 'Kesc Society');
    // this.makePickup(24.849272, 67.050196, 'Kala Pull');
    // this.makePickup(24.836742, 67.067651, 'Defence More');
    // this.makePickup(24.834717, 67.071679, 'Akhter Colony');
    // this.makePickup(24.833491, 67.080648, 'Defence View');
    // this.makePickup(24.862392, 67.087594, 'PAF Chapter');
  }

  ionViewDidEnter() {
    this.map.getLiveLocation().subscribe(resp => {
      // Map coords will update once when map location is enabled
      if (resp.coords.latitude !== 0 && resp.coords.longitude !== 0)
      if (!this.updated) {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.updated = true;
        const mapOptions: google.maps.MapOptions = {
          center: new google.maps.LatLng(this.lat, this.lng),
          zoom: 14,
          disableDefaultUI: true,
          clickableIcons: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: this.db.userData.isDriver ? this.map.darkMap : this.map.lightMap
        };
        this.map.initMap(mapOptions);
      } else {
        // Position marker will keep changing
        this.liveLat = resp.coords.latitude;
        this.liveLng = resp.coords.longitude;
        // Add marker for live location
        this.map.addMarker(new google.maps.LatLng(this.liveLat, this.liveLng));
      }
    }, console.error);
    this.showPickups();
  }

  gotoPage(path: string) {
    this.map.closeWindow();
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.db.theme.setTheme(false);
    this.db.ngOnDestroy();
    this.cs.ngOnDestroy();
    this.authService.logout();
  }

  // Pikcups
  makePickup(lat: number, lng: number, name = 'Unnamed Place') {
    this.db.unionArray('app/pickups', 'locations', Object.assign({}, new Location(lat, lng, name))).catch(this.alertService.error);
  }

  showPickups() {
    this.db.getLivePickups().subscribe(pickups => {
      // Show each pickup point
      pickups.forEach((pickup, index) => {
        // Lat Lng
        const latLng = new google.maps.LatLng(pickup.lat, pickup.lng);
        // Icon URL
        let color: string;
        // Look if added as driver or rider
        if (this.db.userData.isDriver)
          color = pickup.drivers.find(driver => driver['email'] === this.db.userLink.email) ? 'green' : 'blue';
        else
          color = pickup.riders.find(rider => rider['email'] === this.db.userLink.email) ? 'green' : 'blue';
        // Use green if added otherwise blue
        const icon = `../../../assets/img/${color}_location.png`;
        // Content
        let content = `<h3>${pickup.name}</h3>`;
        // Show if user is rider
        if (!this.db.userData.isDriver) {
          if (pickup.drivers.length === 0) {
            content += '<p>There are currently no drivers who pass by this point.</p>';
          } else {
            content += `<b>Tap to see driver's profile: </b>`;
            pickup.drivers.forEach(driver => {
              content += `
              <span>
              <ion-chip data-email="${driver.email}">${driver.name}</ion-chip>
              </span>
              `;
            });
          }
          // Button
          if (!this.addedToLocation('riders', pickup)) {
            content += `
            <ion-button class="pickup-button" id="addRider" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
            I can be picked up<br>from this location
            </ion-button>
            `;
          } else {
            content  += `
            <ion-button class="pickup-button" id="removeRider" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              Added Successfully<br>As Rider
            </ion-button>
            `;
          }
        } else {
          if (pickup.riders.length === 0) {
            content += '<p>There are currently no riders who can make it to this point.</p>';
          } else {
            content += `<b>Tap to see rider's profile: </b><br>`;
            pickup.riders.forEach(rider => {
              content += `
              <span>
              <ion-chip data-email="${rider.email}">${rider.name}</ion-chip>
              </span>
              `;
            });
          }
          // Button
          if (!this.addedToLocation('drivers', pickup)) {
            content += `
            <ion-button class="pickup-button" id="addDriver" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              I can pickup riders<br>from this location
            </ion-button>
            `;
          } else {
            content  += `
            <ion-button class="pickup-button" id="removeDriver" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              Added Successfully<br>As Driver
            </ion-button>
            `;
          }
        }
        // Add to map
        this.map.addMarker(latLng, icon, content);
      });
    });
  }

  viewProfile(userInfo: string[]) {
    this.router.navigateByUrl('members/view');
    this.db.getUserView(new UserLink(userInfo[0], userInfo[1]));
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.db.userLink.email);
    return false;
  }

  pickupClicked(pickupInfo: string[]) {
    // Execute -> id(location, index)
    this[pickupInfo[0]](JSON.parse(pickupInfo[1]), parseInt(pickupInfo[2], 10));
  }

  addRider(pickup: Location, index: number) {
    // Confirmation
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Adding
      this.alertService.load('Adding as rider...', this.db.addRider(pickup, index).catch(this.alertService.error));
    });
  }

  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      this.alertService.load('Removing from riders list', this.db.removeRider(pickup, index));
    });
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Load
      this.alertService.load('Adding you as a driver...', this.db.addDriver(pickup, index));
    });
  }

  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Load
      this.alertService.load('Removing from drivers list', this.db.removeDriver(pickup, index));
    });
  }


}
