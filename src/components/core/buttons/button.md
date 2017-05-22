#### Basic usage

```javascript
<Button
  className={styles.button}
  icon="fetch"
  onClick={handler}
  isLoading={fetchState.inProgress}
  disabled={!fetchState.finished}
>
  Fetch Items
</Button>
```

### Generic Button

```javascript
import Button from 'components/buttons/button'
```

```
<Button>Push Me</Button>
```

### States

```
<div className="demo">
  <Button>Ready</Button>
  <Button isLoading>Loading...</Button>
  <Button disabled>Disabled</Button>
  <Button isPdp>Disabled</Button>
  <Button>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Button>
</div>
```


