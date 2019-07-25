import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

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

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private router: Router,
    private cs: ChatService
  ) {
    // Load all pickups live
    this.db.loadLivePickups();
    // Load all chats live - will detect any new chat
    cs.loadChats();
  }

  ngOnInit() {
  }

  gotoPage(path: string) {
    // TODO: Close map info window when routing
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.authService.logout().then(() => {
      this.db.theme.setTheme(false);
      this.db.logout();
      this.db.ngOnDestroy();
      this.cs.ngOnDestroy();
      console.log('logged out');
    });
  }

  get pickups() {
    return this.db.pickups;
  }

}
