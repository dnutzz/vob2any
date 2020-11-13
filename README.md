# vob2any
Simple windows shell/js script for converting VIDEO_TS VOBS to any single-file video format (MKV, MP4..). I've developed this for my father-in-law, who wanted to transcode his old family videos to a newer single-file format. Therefore I made the script working via windows context (rightclicking on video_ts) and immediately invoking the transcoding action.

![Snapshot of Context Menu Entry](snapshot.png?raw=true "Context Entry")

## Get started
- Create a new entry in Computer\HKEY_CLASSES_ROOT\Directory\shell\
- As command add `cmd /k node "ABSOLUTE_PATH_TO_YOUR_REPO\index.js" %1`
- In the git repo execute `npm i` to get the needed libraries

## How to use
- Rightclick on VIDEO_TS Folder
- a temporary single VOB file is being created utilizing the binary stream-copy from windows
- this file then gets encoded with ffmpeg-static library shipped with this script

## How does it work or why does it not work?
- I try to only consider the files in form of `VTS_01_1.VOB` or `VTS_01_2.VOB` with a filesize greater than 0 so that I can get rid of the typical index file `VTS_01_0.VOB`, which contains no video material. File ending `.vob` is also processed. Any other file like metadata, chapter etc. is not considered by this script (maybe a further todo, but there is then no chance to use a simple mp4 container, need to switch to team matroska I guess).
- Right now I hardcoded the encoding flags in the index.js (libx264 as video codec and 192k aac audio bitrate which fulfills most of the needs): feel free to adapt it according your needs.

## Requirements
- node v.12.18

