import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink, User } from 'src/app/services/helper-classes';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { ChatService } from 'src/app/services/chat.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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

  // Marker Location
  liveLat = 0;
  liveLng = 0;
  // Map location
  lat = 0;
  lng = 0;

  // Close previous window
  infoWindowOpened = null;
  previousInfoWindow = null;

  constructor(
    private authService: AuthenticationService,
    public map: MapsService,
    public db: DatabaseService,
    private router: Router,
    private cs: ChatService,
    private alertService: AlertService
  ) {
    // if (!authService.user) {
    //   // Defaults
    //   db.userData = new User;
    //   db.userLink = new UserLink('', '');
    //   // Get from local storage
    //   db.getLocalUserData().then(data => {
    //     db.userData = JSON.parse(data);
    //     this.db.theme.setTheme(db.userData.isDriver);
    //   });
    //   authService.getLocalUser().then(data => {
    //     authService.user = JSON.parse(data);
    //     db.userLink.name = authService.user.displayName;
    //     db.userLink.email = authService.user.email;
    //   });
    // }
    // Load all chats live
    db.getLiveDoc(`users/${db.userLink.email}`).subscribe(doc => db.userData.chats = doc.payload.data()['chats']);
    // Update all messages within chats
    cs.loadMessages();
    // // Check when authenticated
    // this.authService.authState.subscribe(state => {
    //   if (state === true) {
    //     // Load all data
    //     this.alertService.load('Loading Your Data...', new Promise(async resolve => {
    //       await this.db.getUserData(this.authService.user.email);
    //       // User link for quick access
    //       this.db.userLink = new UserLink(this.authService.user.displayName, this.authService.user.email);
    //       // Load all chats
    //       await this.cs.loadMessages();
    //       resolve();
    //     }));
    //   }
    // });
    // this.makePickup(24.900868,67.11631, 'Askari 4');
    // this.makePickup(24.934478,67.177173, 'MalirCanttgate6Phasell');
    // this.makePickup(24.940228,67.18198,'Askri5');
    // this.makePickup(24.961253,67.187153, 'Phase1');
    // this.makePickup(24.954533,67.180362, 'Falcon');
    // this.makePickup(24.948738,67.214524, 'CMH');
    // this.makePickup(24.931672,67.204522, 'X20');
    // this.makePickup(24.928067,67.204628, 'CanttBazar');
    // this.makePickup(24.925115,67.202414, 'MalirCanttGate#2');
    // this.makePickup(24.950412,67.1068, 'FariyaChowke');
    // this.makePickup(24.954445,67.117268, 'KneezFatima');
    // this.makePickup(24.957601,67.121253, 'MadrasChoke');
    // this.makePickup(24.951597,67.131382, 'SuchalGoath');
    // this.makePickup(24.955852,67.134924, 'KiranHospital');
    // this.makePickup(24.951857,67.140102, 'ChapalGarden');
    // this.makePickup(24.895306,67.212212, 'Malir');
    // this.makePickup(24.9125912,67.1398402, 'SindhBaloch');
    // this.makePickup(24.923641,67.137724, 'KamranChowrangi');
    // this.makePickup(24.920396,67.134292, 'MunawarChowrangi');
    // this.makePickup(24.916553,67.130302, 'RadoCenter');
    // this.makePickup(24.914032,67.127501, 'DarulSehat');
    // this.makePickup(25.0188857,66.9766756, 'MaymarMobilemall');
    // this.makePickup(24.948403,67.090934, 'AlAsif');
    // this.makePickup(24.9422,67.096592, 'ParadiseBakery');
    // this.makePickup(24.934926,67.105316, 'Maskan');
    // this.makePickup(24.929155,67.097531, 'DiscoBakry');
    // this.makePickup(24.910761,67.105306, 'Alladin');
    // this.makePickup(24.906696,67.111199, 'Lasania');
    // this.makePickup(24.900868,67.11631, 'Askari4');
    // this.makePickup(25.006514,67.0641, '4KStop');
    // this.makePickup(25.000641,67.064861, '2Minute');
    // this.makePickup(24.98527,67.06543, 'PowerHouse');
    // this.makePickup(24.978579,67.066708, 'SaleemCenter');
    // this.makePickup(24.972588,67.066634, 'UP-More');
    // this.makePickup(24.966045,67.067371, 'Nagan(DahliHall)');
    // this.makePickup(24.962792,67.053765, 'Shadman2-1');
    // this.makePickup(24.959528,67.050178, 'SakhiHassan');
    // this.makePickup(24.947471,67.065896, 'DCOffice');
    // this.makePickup(24.9328,67.082907, 'UBLSports(KIHD)');
    // this.makePickup(24.900868,67.11631, 'Malir');
    // this.makePickup(24.985161,67.055121, 'AjmairNagri');
    // this.makePickup(24.978726,67.0555, 'BaraDari');
    // this.makePickup(24.955192,67.058664, 'BabulIslam');
    // this.makePickup(24.971885,67.056017, 'DiscoMore');
    // this.makePickup(24.964608,67.067094, 'AlHabib');
    // this.makePickup(24.98527,67.06543, 'PowerHouse');
    // this.makePickup(24.951333,67.005478, 'Kalandria');
    // this.makePickup(24.936616,67.055147, 'Landikotal');
    // this.makePickup(24.93243,67.059299, 'TahirVillas');
    // this.makePickup(24.927419,67.064404, 'AyeshaManzil');
    // this.makePickup(24.930534,67.071653, 'Naseerabad');
    // this.makePickup(24.948283,67.040367, 'Shipowner');
    // this.makePickup(24.942595,67.047492, '5Star');
    // this.makePickup(24.947656,67.051718, 'Farooq-e-Azam');
    // this.makePickup(24.947155,67.052585, 'MateenFood');
    // this.makePickup(24.941094,67.060381, 'NiazManzil');
    // this.makePickup(24.94261,67.06193, 'DentalCollege');
    // this.makePickup(24.936819,67.075986, 'Gulberg');
    // this.makePickup(24.900868,67.11631, 'Malir');
    // this.makePickup(24.96492,67.053357, 'AndaMore');
    // this.makePickup(24.971885,67.056017, 'DiscoMore');
    // this.makePickup(24.960589,67.072985, 'Café2days');
    // this.makePickup(24.938021,67.085555, 'FazalMill');
    // this.makePickup(24.893814,67.030667, 'BaraBoard');
    // this.makePickup(24.901624,67.03011, 'GolimarChowrangi');
    // this.makePickup(24.910939,67.030739, 'PetrolPump');
    // this.makePickup(24.910104,67.039885, '4#Liaquatabad');
    // this.makePickup(24.909338,67.048472, '10#LaluKhait');
    // this.makePickup(24.90817,67.061921, 'BalochHotel');
    // this.makePickup(24.901103,67.072968, 'HassanSquare');
    // this.makePickup(24.904838,67.079146, 'MumtazManzil');
    // this.makePickup(24.908587,67.084079, 'BaitulMukaram');
    // this.makePickup(24.91133,67.094277, 'UrduScience');
    // this.makePickup(24.908394,67.109281, 'LalFlate');
    // this.makePickup(24.873023,67.022105, 'GardenPSOPump');
    // this.makePickup(24.876843,67.03091, 'SoldierBazar1,2,3,');
    // this.makePickup(24.880543,67.039768, 'Guromander');
    // this.makePickup(24.885032,67.056977, 'JailChorangi');
    // this.makePickup(24.889253,67.061191, 'NewTown');
    // this.makePickup(24.888773,67.065549, 'LiaquatLibrary');
    // this.makePickup(24.888326,67.086611, 'PeerPagaraRoad');
    // this.makePickup(24.865049,67.023619, 'GullPlaza');
    // this.makePickup(24.866468,67.027371, '7Day');
    // this.makePickup(24.873049,67.036527, 'Numaish');
    // this.makePickup(24.868056,67.052539, 'Noorani');
    // this.makePickup(24.881477,67.063469, 'KhalidBinWalid(Madicare)');
    // this.makePickup(24.884008,67.064465, 'Sharfabad');
    // this.makePickup(24.882394,67.06728, 'Bahadurabad');
    // this.makePickup(24.890298,67.072096, 'AghaKhanH.');
    // this.makePickup(24.893613,67.088223, 'Dalmian(BahriaUni)');
    // this.makePickup(24.871117,67.094426, 'Karachiauditorium');
    // this.makePickup(24.883069,67.02652, 'Alibhai');
    // this.makePickup(24.87016,66.988609, 'JamatKhana');
    // this.makePickup(24.881784,67.033714, 'Fatimeet');
    // this.makePickup(24.86793,67.05241, 'NooriKabab');
    // this.makePickup(24.860532,67.032146, 'ZahidNehari');
    // this.makePickup(24.872126,67.059917, 'Laberty');
    // this.makePickup(24.872097,67.070256, 'HillPark');
    // this.makePickup(24.883495,67.082188, 'ZubaidaHospital');
    // this.makePickup(24.834133,67.033652, '3Talwar');
    // this.makePickup(24.843838,67.04022, 'CanttStation');
    // this.makePickup(24.849174,67.050121, 'KalaPull');
    // this.makePickup(24.848186,66.995363, 'Tower');
    // this.makePickup(24.815534, 67.020258, 'BilawalHouse');
    // this.makePickup(24.817407, 67.040236, 'Zamzama');
    // this.makePickup(24.819380, 67.045720, 'Gizri');
    // this.makePickup(24.823085, 67.058668, 'Phase4');
    // this.makePickup(24.807343, 67.076992, 'Khayaban-e-itehad');
    // this.makePickup(24.820412, 67.125101, 'NasirJump');
    // this.makePickup(24.831671, 67.173072, 'Landhi#6');
    // this.makePickup(24.838010, 67.181873, 'Landhi#4');
    // this.makePickup(24.844792, 67.197861, 'Landhi#1');
    // this.makePickup(24.784955, 67.065771, '26thStreet');
    // this.makePickup(24.793059, 67.064710, 'Kh.Bukhari');
    // this.makePickup(24.808497, 67.061739, 'Shahbaz');
    // this.makePickup(24.829687, 67.074113, 'XectStop');
    // this.makePickup(24.831417, 67.076968, 'HinoBridge');
    // this.makePickup(24.867147, 67.082997, 'SingerCh.');
    // this.makePickup(24.893421,67.043834, 'TeenHatti');
    // this.makePickup(24.927602,67.064483, 'AyeshaManzil');
    // this.makePickup(24.935812,67.075522, 'WaterPump');
    // this.makePickup(24.918617, 67.030721, '7#Nazimabad');
    // this.makePickup(24.920216,67.029677, 'AbbasiHospital');
    // this.makePickup(24.922226, 67.024212, 'KhalafatChowke');
    // this.makePickup(24.928458, 67.024032, 'AbdullahCollege');
    // this.makePickup(24.951748, 67.002513, 'OrangiTown');
    // this.makePickup(24.921502, 67.050358, 'MosaColony');
    // this.makePickup(24.914349, 67.056928, 'UsmanMemorial');
    // this.makePickup(24.897796, 67.077079, 'DCOffice');
    // this.makePickup(24.882578, 67.355984, 'Gulshan-e-Hadeed');
    // this.makePickup(24.862922, 67.336711, 'SteelTown');
    // this.makePickup(24.872938, 67.291769, 'Razaqabad');
    // this.makePickup(24.932593, 67.155116, 'ComanderCNGPump');
    // this.makePickup(24.942917, 67.150503, 'Safoora');
    // this.makePickup(24.933983, 67.177425, 'CanttGate2');
    // this.makePickup(24.927707, 67.203264, 'CanttGate');
    // this.makePickup(24.903156, 67.182185, 'ModelMore');
    // this.makePickup(24.901899, 67.190030, 'ModelColony');
    // this.makePickup(24.893387, 67.194334, 'SaudAbad');
    // this.makePickup(24.879018, 67.188486, 'Malir15');
    // this.makePickup(24.859214,67.017572, 'UrduBazar');
    // this.makePickup(24.86076,67.024159, 'Regal');
    // this.makePickup(24.856796,67.030682, 'Sarawan');
    // this.makePickup(24.857308,67.033193, 'LuckyStar');
    // this.makePickup(24.855429,67.040002, 'RegentPlaza');
    // this.makePickup(24.858763,67.050324, 'FTC');
    // this.makePickup(24.860607,67.062839, 'Nursary');
    // this.makePickup(24.862432,67.06972, 'LalKothi');
    // this.makePickup(24.883961,67.115791, 'PafBaseFaisal');
    // this.makePickup(24.887068, 67.125535, 'DigRoad');
    // this.makePickup(24.887344, 67.155995, 'StarGate');
    // this.makePickup(24.885526, 67.167993, 'WirelessGate');
    // this.makePickup(24.884407, 67.175378, 'MalirHalt');
    // this.makePickup(24.936800, 67.031360, 'AsgharAliStd');
    // this.makePickup(24.944173, 67.031341, 'KattiPahari');
    // this.makePickup(24.923312, 67.068043, 'MukaChowke');
    // this.makePickup(24.920423, 67.070867, 'BhijanChoke');
    // this.makePickup(24.916562, 67.081454, '13D1Signal');
    // this.makePickup(24.920454, 67.086561, 'MochiMore');
    // this.makePickup(24.931289, 67.037070, 'KDA');
    // this.makePickup(24.937063, 67.042261, 'Haydri');
    // this.makePickup(24.961776, 67.070571, 'AlHabib');
    // this.makePickup(24.959513, 67.074589, 'NamakBank');
    // this.makePickup(24.918588, 67.129594, 'JoharMore');
    // this.makePickup(24.907946, 67.119138, 'HilTop');
    // this.makePickup(24.905789, 67.116395, 'PerfumeChowke');
    // this.makePickup(24.912153, 67.125686, 'JoharChowrangi');
    // this.makePickup(24.937416, 67.144295, 'Mosmiyat');
    // this.makePickup(24.891683, 67.177928, 'SecurityPrinting');
    // this.makePickup(24.938205, 67.150186, 'JoharComplex');
    // this.makePickup(24.917428, 67.097471, 'NIPA');
    // this.makePickup(24.925555, 67.107851, 'SafariPark');
    // this.makePickup(24.928503,67.111856, 'Samama');
    // this.makePickup(24.923200, 67.117286, 'Continental');
    // this.makePickup(24.939230, 67.159053, 'Kesc Society');
    // this.makePickup(24.849272,67.050196, 'KalaPull');
    // this.makePickup(24.836742, 67.067651, 'DeffanceMore');
    // this.makePickup(24.834717, 67.071679, 'AkhterColony');
    // this.makePickup(24.833491, 67.080648, 'DeffanceView');
    // this.makePickup(24.862392, 67.087594, 'PAFChapter');
  }

  ngOnInit() {
    this.map.getLiveLocation().subscribe(resp => {
      // Map coords will update once
      if (this.lat === 0 && this.lng === 0) {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      }
      // Position marker will keep changing
      this.liveLat = resp.coords.latitude;
      this.liveLng = resp.coords.longitude;
    });
    this.showPickups();
  }

  gotoPage(path: string) {
    if (this.previousInfoWindow)
      this.closeWindow();
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
    this.db.unionArray('app/pickups', 'locations', Object.assign({}, new Location(lat, lng, name)));
  }

  showPickups() {
    this.db.getPickups();
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.db.userLink.email);
    return false;
  }

  pickupUrl(pickup: Location, index: number): string {
    let color: string;
    // Look if added as driver or rider
    if (this.db.userData.isDriver)
      color = pickup.drivers.find(driver => driver['email'] === this.db.userLink.email) ? 'green' : 'blue';
    else
      color = pickup.riders.find(rider => rider['email'] === this.db.userLink.email) ? 'green' : 'blue';
    // Return green if added otherwise blue
    return `../../../assets/img/${color}_location.png`;
  }

  addRider(pickup: Location, index: number) {
    // Confirmation
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      this.alertService.load('Adding as rider...', this.db.addRider(pickup, index));
      this.closeWindow();
    });
  }

  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      this.alertService.load('Removing from riders list', this.db.removeRider(pickup, index));
      this.closeWindow();
    });
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Load
      this.alertService.load('Adding you as a driver...', this.db.addDriver(pickup, index));
      this.closeWindow();
    });
  }

  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Load
      this.alertService.load('Removing from drivers list', this.db.removeDriver(pickup, index));
      this.closeWindow();
    });
  }

  // Maps
  closeWindow() {
    if (this.previousInfoWindow)
      this.previousInfoWindow.close();
    this.previousInfoWindow = null;
  }

  selectMarker(infoWindow: InfoWindow) {
    if (this.previousInfoWindow == null)
      this.previousInfoWindow = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previousInfoWindow.close();
    }
    this.previousInfoWindow = infoWindow;
  }

}
