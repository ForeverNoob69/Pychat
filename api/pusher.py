import pusher

pusher_client = pusher.Pusher(
  app_id='1557135',
  key='f12d9df33bdc80d7947b',
  secret='42602ecefc68184bf715',
  cluster='ap2',
  ssl=True
)

# pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})