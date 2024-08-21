import { Component, OnInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService} from 'stream-chat-angular';



@Component({
  selector: 'task-sync-chat',
  standalone: true,
  imports: [
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{  

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ){
    const apiKey = 'skjskjkkjgjf';
    const userId = 'empty-bsuhdkjcb';
    const userToken = 'dkjfksdsbksbfdkbz';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();

    
  }
  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular',{
      image: 'src\assets\img\img_faitec.png',
      name: 'Talking abou angular',

    });
    await channel.create();
    this.channelService.init({
      type:  'messaging',
      id: { $eq: 'talking-about-angular'},
    });

  }

  

}