# Local Installation Guide (Not Published Yet)

Since the package is **not published to npm yet**, you cannot install it through n8n's Community Nodes UI. Use one of these methods instead:

## Method 1: Direct npm Link (Recommended for Development)

The package is already linked globally. Now link it to your n8n installation:

### Step 1: Find your n8n installation directory

```bash
# If you installed n8n globally
npm root -g

# Common locations:
# Windows: C:\Users\<username>\AppData\Roaming\npm\node_modules\n8n
# Linux/Mac: /usr/local/lib/node_modules/n8n
```

### Step 2: Navigate to n8n directory

```bash
cd /path/to/n8n/installation
```

### Step 3: Link the package

```bash
npm link n8n-nodes-mongo-bulk
```

### Step 4: Restart n8n

```bash
# Stop n8n (Ctrl+C if running)
# Start again
n8n start
```

## Method 2: Install Directly from Folder

Install the package directly from the local folder:

```bash
# Navigate to your n8n custom directory
cd ~/.n8n

# Install from local folder (use absolute path)
npm install C:\Users\Rujiroj.Ta\Documents\DEV\BK-DEV\project-open-source\n8n-node-mongo-bulk
```

Restart n8n after installation.

## Method 3: Copy to Custom Nodes Directory

For n8n installations that support custom nodes:

```bash
# Create custom nodes directory if it doesn't exist
mkdir -p ~/.n8n/custom

# Copy the compiled files
cp -r C:\Users\Rujiroj.Ta\Documents\DEV\BK-DEV\project-open-source\n8n-node-mongo-bulk\dist/* ~/.n8n/custom/
```

## Verify Installation

After installation, check if the node appears:

1. Open n8n in your browser
2. Create/open a workflow
3. Click the **+** button to add a node
4. Search for **"MongoDB Bulk"**

If it appears, the installation was successful!

## Publishing to NPM (To Use Community Nodes UI)

To install via n8n's Community Nodes UI, you must first publish the package:

### Step 1: Create an npm account
```bash
npm login
```

### Step 2: Update package.json (if needed)

Make sure the package name is unique:
```json
{
  "name": "n8n-nodes-mongo-bulk",
  "version": "1.0.0"
}
```

### Step 3: Publish
```bash
npm publish
```

### Step 4: Install in n8n

After publishing, you can use n8n's UI:
1. Go to **Settings > Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-mongo-bulk`
4. Click **Install**

## Troubleshooting

### "Cannot find module" error

Make sure you're in the correct n8n directory when linking:

```bash
# Check where n8n is installed
which n8n

# Or for Windows
where n8n
```

### Node doesn't appear in n8n

1. Clear n8n cache:
   ```bash
   rm -rf ~/.n8n/cache
   ```

2. Restart n8n completely:
   ```bash
   pkill -f n8n
   n8n start
   ```

3. Check browser console for errors

### Permission errors

On Linux/Mac, you might need sudo:
```bash
sudo npm link n8n-nodes-mongo-bulk
```

## Next Steps

Once installed successfully:
1. Add MongoDB credentials in n8n
2. Try the test workflow from SETUP.md
3. Check EXAMPLES.md for real-world usage

## Quick Test Command

To verify the package is linked correctly:

```bash
npm list -g n8n-nodes-mongo-bulk
```

This should show the package is linked globally.
