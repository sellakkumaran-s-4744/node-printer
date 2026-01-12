#!/usr/bin/env python
import os
import sys
import shutil
import platform

# copyWithABI.py <source> <dest_dir> <abi_version>
# Copies the binary to destination with platform_arch_abi naming convention

if len(sys.argv) != 4:
    print("Usage: copyWithABI.py <source> <dest_dir> <abi_version>")
    sys.exit(1)

source = sys.argv[1]
dest_dir = sys.argv[2]
abi_version = sys.argv[3]

# Get platform and architecture
plat = platform.system().lower()
if plat == "darwin":
    plat = "darwin"
elif plat == "windows":
    plat = "win32"
elif plat == "linux":
    plat = "linux"

# Get architecture
import struct
arch = "x64" if struct.calcsize("P") == 8 else "ia32"
if platform.machine().lower() in ["arm64", "aarch64"]:
    arch = "arm64"

# Create destination filename
dest_filename = "node_printer_{}_{}_{}.node".format(plat, arch, "abi" + abi_version)
dest_path = os.path.join(dest_dir, dest_filename)

# Ensure destination directory exists
if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# Copy file
print("Copying {} to {}".format(source, dest_path))
shutil.copy2(source, dest_path)

print("Binary copied successfully to: {}".format(dest_path))
