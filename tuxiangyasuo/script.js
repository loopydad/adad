const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const bearReplies = [
  '嗷呜～我在认真听你说话呢！',
  '抱抱你，今天也要对自己温柔一点呀。',
  '小熊建议：先喝一口温水，再慢慢想办法。',
  '你说得真好，我的毛茸茸耳朵都竖起来啦！',
  '嘿嘿，你来找我聊天我超开心的。',
  '没关系，我们可以一步一步来，我陪你。'
];

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function pickReply(userText) {
  if (userText.includes('你好')) return '你好呀！我是你的小熊朋友 🐻';
  if (userText.includes('难过') || userText.includes('伤心')) return '来，小熊给你一个大大的抱抱。';
  if (userText.includes('晚安')) return '晚安喔，愿你梦里也有软软的小熊云朵。';

  const idx = Math.floor(Math.random() * bearReplies.length);
  return bearReplies[idx];
}

addMessage('你好，我是小熊！今天想聊点什么呀？', 'bear');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  setTimeout(() => {
    addMessage(pickReply(text), 'bear');
  }, 350);
});
