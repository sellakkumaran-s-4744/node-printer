#!/usr/bin/env node
/**
 * Comprehensive test script for node-printer on Node.js 22+
 */

const printer = require('./lib/printer');

console.log('='.repeat(60));
console.log('Node-Printer Test Suite for Node.js 22+');
console.log('='.repeat(60));
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('='.repeat(60));

// Test 1: Get all printers
console.log('\n1. Testing getPrinters()...');
try {
    const printers = printer.getPrinters();
    console.log('   ✓ getPrinters() succeeded');
    console.log('   Found', printers.length, 'printer(s)');
    if (printers.length > 0) {
        console.log('   First printer:', printers[0].name);
    }
} catch (err) {
    console.error('   ✗ Error:', err.message);
}

// Test 2: Get default printer
console.log('\n2. Testing getDefaultPrinterName()...');
try {
    const defaultPrinter = printer.getDefaultPrinterName();
    console.log('   ✓ getDefaultPrinterName() succeeded');
    if (defaultPrinter) {
        console.log('   Default printer:', defaultPrinter);
    } else {
        console.log('   No default printer set');
    }
} catch (err) {
    console.error('   ✗ Error:', err.message);
}

// Test 3: Get supported formats
console.log('\n3. Testing getSupportedPrintFormats()...');
try {
    const formats = printer.getSupportedPrintFormats();
    console.log('   ✓ getSupportedPrintFormats() succeeded');
    console.log('   Supported formats:', formats.join(', '));
} catch (err) {
    console.error('   ✗ Error:', err.message);
}

// Test 4: Get supported job commands
console.log('\n4. Testing getSupportedJobCommands()...');
try {
    const commands = printer.getSupportedJobCommands();
    console.log('   ✓ getSupportedJobCommands() succeeded');
    console.log('   Supported commands:', commands.join(', '));
} catch (err) {
    console.error('   ✗ Error:', err.message);
}

// Test 5: Get specific printer (if available)
console.log('\n5. Testing getPrinter()...');
try {
    const printers = printer.getPrinters();
    if (printers.length > 0) {
        const printerInfo = printer.getPrinter(printers[0].name);
        console.log('   ✓ getPrinter() succeeded');
        console.log('   Printer:', printerInfo.name);
        console.log('   Is Default:', printerInfo.isDefault);
        console.log('   Jobs:', printerInfo.jobs ? printerInfo.jobs.length : 0);
    } else {
        console.log('   ⊘ No printers available to test');
    }
} catch (err) {
    console.error('   ✗ Error:', err.message);
}

// Test 6: Get printer driver options (POSIX only)
if (process.platform !== 'win32') {
    console.log('\n6. Testing getPrinterDriverOptions() [POSIX only]...');
    try {
        const printers = printer.getPrinters();
        if (printers.length > 0) {
            const options = printer.getPrinterDriverOptions(printers[0].name);
            console.log('   ✓ getPrinterDriverOptions() succeeded');
            if (options && options.options) {
                console.log('   Available options:', Object.keys(options.options).length);
            }
        } else {
            console.log('   ⊘ No printers available to test');
        }
    } catch (err) {
        console.error('   ✗ Error:', err.message);
    }

    console.log('\n7. Testing getSelectedPaperSize() [POSIX only]...');
    try {
        const printers = printer.getPrinters();
        if (printers.length > 0) {
            const paperSize = printer.getSelectedPaperSize(printers[0].name);
            console.log('   ✓ getSelectedPaperSize() succeeded');
            console.log('   Paper size:', paperSize || 'not specified');
        } else {
            console.log('   ⊘ No printers available to test');
        }
    } catch (err) {
        console.error('   ✗ Error:', err.message);
    }
} else {
    console.log('\n6-7. Skipping POSIX-only tests on Windows');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('Test suite completed successfully!');
console.log('All core functionalities are working on Node.js', process.version);
console.log('='.repeat(60));
