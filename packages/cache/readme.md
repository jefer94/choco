# What's it

A cache service in memory, that improve performance, because caching a Mongo result

# POST / 
```typescript
type Request = {
  mode: 'get' | 'set'
  key: string,
  value: string
}