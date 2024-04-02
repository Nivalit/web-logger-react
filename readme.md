# Web Logger React Context

Small React package to create a facade that communicates with WebLogger service.
Provides useLogger hook that allow user to send diagnostic data and map them to GELF format.

## 🧭 Usage

```shell
npm --save @nivalit/web-logger-react
```

Add Provider to your app root component:

```typescript
function App() {
  return (
    <LoggerProvider
      type="EXTERNAL"
      options={{ host: "https://logger.acme.com:9000", logLevel: "WARNING" }}
    >
      <h1>Web Logger</h1>
    </LoggerProvider>
  );
}
```

Use in any your component by context hook:

```typescript
function Children() {

  logger = useLogger()

  const createPost = (id: string) => {
    try {
      logger.debug(`Post - Create new with id=${id}`)
      ...
    } catch(e) {
      logger.error(`Post - Failed to create post with id=${id}`, e.stack)
    }
  }
}
```

You can open the [Index.tsx file](./src/index.tsx) to see how it can be implemented

## 💻 Developer environment

Use `src` directory to test how `LoggerContext` works. Finally the `lib` directory is compiled and packed to `es` and `umd` formats.

## 📑 Documentation

LoggerProvider

| Property | Value Type              | Description                                                |
| -------- | ----------------------- | ---------------------------------------------------------- |
| type     | `CONSOLE` \| `EXTERNAL` | Define which logger service use (default value: "CONSOLE") |
| disable  | `boolean`               | If true disable all logs in within provider                |
| options  | `LoggerOptions`         | Configuration of GELF host and log level threshold         |
| children | `ReactNode` (required)  | Provider child component                                   |

useLogger

| Method   | Arguments                            |
| -------- | ------------------------------------ |
| debug    | message: string                      |
| info     | message: string                      |
| notice   | message: string                      |
| warn     | message: string                      |
| error    | message: string, stackTrace?: string |
| critical | message: string                      |
| alert    | message: string                      |
