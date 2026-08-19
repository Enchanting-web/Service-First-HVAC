#!/usr/bin/env bash
# Pulls the genuine job-site, team and blog photography off the current live
# site so the rebuilt site serves it locally instead of hotlinking.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/work public/team public/blog

fetch() {
  local url="$1" dest="$2"
  if [ -s "$dest" ]; then
    echo "skip  $dest"
    return
  fi
  if curl -fsSL --max-time 45 -o "$dest" "$url"; then
    echo "ok    $dest  ($(wc -c <"$dest" | tr -d ' ') bytes)"
  else
    echo "FAIL  $dest  <- $url" >&2
    rm -f "$dest"
  fi
}

# Project gallery / Our Work
fetch "https://i.postimg.cc/ryhnPw8M/IMG_3049.jpg" public/work/commercial-hvac-installation.jpg
fetch "https://i.postimg.cc/8sQr0vcy/IMG_7182.jpg" public/work/residential-furnace-upgrade.jpg
fetch "https://i.postimg.cc/MKvP2JTb/IMG_7842.jpg" public/work/residential-ac-unit.jpg
fetch "https://i.postimg.cc/pV0G6L2x/473081816_939655865043653_1453392684953026859_n.jpg" public/work/lennox-control-panel.jpg
fetch "https://i.postimg.cc/8PjKQg5P/IMG_3910.jpg" public/work/ac-system-install.jpg
fetch "https://i.postimg.cc/XvdHXKSx/472923774-938313961844510-6808865642993697393-n.jpg" public/work/emergency-repair.jpg
fetch "https://buckleyhvac.com/york-ac-unit-wall-mount.jpg" public/work/york-ac-unit-wall-mount.jpg
fetch "https://buckleyhvac.com/ac-cleaning-before-after.jpg" public/work/ac-cleaning-before-after.jpg

# Team
fetch "https://i.postimg.cc/85GJ6112/bryan.png" public/team/bryan-buckley.png
fetch "https://i.postimg.cc/mkXtJC7Q/image.png" public/team/justin-eglian.png
fetch "https://i.postimg.cc/c1tjfMXT/thumbnail-3c82daf2-7072-48cd-9872-1d33c21b6d6c.png" public/team/crew.png

# Blog
fetch "https://buckleyhvac.com/summer-heat-ac.jpg" public/blog/summer-heat-ac.jpg
fetch "https://i.postimg.cc/d3rvkknj/JBsdo_N5G38GCji_J9.png" public/blog/hvac-maintenance-benefits.png
fetch "https://i.postimg.cc/bv7NmkFn/IMG_7840.jpg" public/blog/choosing-a-furnace.jpg
fetch "https://i.postimg.cc/BbHsLLNg/hnbmi_SPw_Ji_Lplew_G.png" public/blog/indoor-air-quality.png
fetch "https://i.postimg.cc/W4Bb5gfh/IMG_7839.jpg" public/blog/hvac-winter-prep.jpg
fetch "https://i.postimg.cc/x8MYJJgy/h8sjrqix8G2wd_Zka.png" public/blog/maintenance-plan.png

echo
echo "--- downloaded ---"
find public/work public/team public/blog -type f -exec ls -lh {} + | awk '{print $5, $9}'
