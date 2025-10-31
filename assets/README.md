# Assets

This directory contains visual assets for the MongoDB Bulk node package.

## Files

### banner.svg
Full-width banner image for the README and documentation.
- Dimensions: 800x200px
- Usage: README header

### logo-square.svg
Square logo for package listings and social media.
- Dimensions: 128x128px
- Usage: npm package icon, social previews

### Icon in nodes/MongoDbBulk/
- `mongodb.svg` - Standard MongoDB icon (32x32)
- `mongodb-bulk.svg` - Enhanced bulk operations icon (64x64)

## Using the Icons

### In README
```markdown
![MongoDB Bulk Banner](./assets/banner.svg)
```

### As npm Package Icon
Add to package.json:
```json
{
  "icon": "assets/logo-square.svg"
}
```

### In n8n Node
The node uses `mongodb.svg` as defined in the node descriptor:
```typescript
icon: 'file:mongodb.svg'
```

## Creating PNG Versions

If you need PNG versions for compatibility:

```bash
# Using ImageMagick
convert banner.svg banner.png
convert logo-square.svg -resize 512x512 logo-512.png

# Using Inkscape
inkscape banner.svg --export-type=png --export-filename=banner.png
```

## Design Elements

- **Primary Color**: #10aa50 (MongoDB Green)
- **Secondary Color**: #13aa52 (Light Green)
- **Font**: Arial, sans-serif
- **Style**: Modern, clean, professional

## License

These assets are part of the n8n-nodes-mongo-bulk package and are licensed under MIT.
