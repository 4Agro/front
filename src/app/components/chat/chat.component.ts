import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  form!: FormGroup;

  openChat: boolean = false;
  messages: { role: string; content: string; }[] = [];

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        message: ['', Validators.required]
      }
    )
  }

  sendMessage() {
    this.messages.push({ role: 'user', content: this.form.get('message')?.value });
    
    this.sendToChatGPT(this.form.get('message')?.value);
  }

  toggleChat() {
    this.openChat = !this.openChat;
  }

  sendToChatGPT(userMessage: string) {
    this.chatService.postData([
      { role: 'system', content: 'Você está conversando com um modelo de linguagem de IA.' },
      { role: 'user', content: userMessage }], 
      'gpt-3.5-turbo').subscribe(
      {
        next: (res) => {
          this.form.reset();
          this.messages.push(res.choices[0].message);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
}
