# Web Logger React Context

Small React package to create a facade that communicates with WebLogger service.
Provides useLogger hook that allow user to send diagnostic data and map them to GELF format.

## Usage

Add Provider to your app root component:

```typescript
function App() {
  return (
    <WebLoggerProvider
      options={{ host: "https://logger.acme.com:9000", logLevel: "WARNING" }}
    >
      <h1>Web Logger</h1>
    </WebLoggerProvider>
  );
}
```

Use in any your component by context hook:

```typescript
function Children() {

  logger = useWebLoggerContext()

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

## Developer environment

Use `src` directory to test how `WebLoggerContext` works. Finally the `lib` directory is compiled and packed to `es` and `umd` formats.
