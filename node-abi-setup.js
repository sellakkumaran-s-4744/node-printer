#!/usr/bin/env node
/**
 * Setup script to register custom ABI versions in node-abi registry
 * This allows the module to work with specific Electron and Node.js versions
 */

const fs = require('fs');
const path = require('path');

try {
  const abiPath = require.resolve('node-abi');
  const dataPath = path.join(path.dirname(abiPath), 'abi_registry.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Register Electron 35.2.1 with ABI 133
  const target = {
    runtime: 'electron',
    target: '35.2.1',
    abi: '133',
    lts: false
  };

  // Check if this ABI entry already exists
  if (!data.some(t => t.runtime === target.runtime && t.target === target.target)) {
    data.push(target);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log('✓ ABI registered: Electron 35.2.1 with ABI 133');
  } else {
    console.log('✓ ABI already registered for Electron 35.2.1');
  }
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    // node-abi might not be installed yet during initial install
    console.log('ℹ node-abi not yet available, skipping ABI setup');
  } else {
    console.error('Warning: Failed to setup ABI registry:', error.message);
    process.exit(0); // Don't fail the install if ABI setup fails
  }
}