# 报文列表

## 1. 请求用户详情 srv -> client

### 请求
```
{
  'cmd': 'query.user.id'
}
```
### 返回
```
{
  'cmd': 'ack.user.id'
  'success': true / false,
  'payload': {
    'id': '用户id，以手机号替代',
    'alias': '用户昵称'
  }
}
```

## 2. 新建用户房间 client -> srv

### 请求
```
{
  'cmd': 'room.create.query'
}
```
### 返回
```
{
  'cmd': 'room.create.ack',
  'success': true,
  'payload': {
    'roomid': '房间号'
  }
}
```

## 3. 加入指定房间 client -> srv

### 请求
```
{
  'cmd': 'room.join.query',
  'payload': {
    'roomid': '房间号'
  }
}
```
### 返回
```
{
  'cmd': 'room.join.ack',
  'success': true / false
}
```

## 4. 获取指定房间当前状态 client -> srv

### 请求
```
{
  'cmd': 'room.currentState.query',
  'payload': {
    'roomid': '房间号'
  }
}
```
### 返回
```
{
  'cmd': 'room.currentState.ack',
  'success': true / false,
  'payload': {
    'id': '房间号',
    'cards': [], // 所有牌列表
    'players': [], // 玩家列表
    'currentPlayers': 0 // 当前玩家
  }
}
```