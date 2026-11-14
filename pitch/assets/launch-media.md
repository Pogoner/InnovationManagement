# Launch film — provenance and processing

The finale uses one continuous 27-second excerpt of NASA's recording of the
Starship integrated flight test on 18 November 2023. Ignition, exhaust clouds,
liftoff and the camera tracking the ascent all come from the same shot.

## Source and usage

- Publisher: NASA, Headquarters FOIA Library, **Starship 2 WB-57 November 2023 Video 2, Part 1 of 2 (0 to 2:53)**.
- Official listing: https://www.nasa.gov/foia/nasa-e-libraries/headquarters-foia-library/
- Original file: https://www.nasa.gov/wp-content/uploads/2024/02/video-2-part-1-of-2-0-to-253-2023-11-18-gss-starship2-land-720p.mp4
- NASA also credits this exact file as “NASA video” in its technical publication: https://ntrs.nasa.gov/api/citations/20250006125/downloads/NASA_TPS_Perspectives_ReusableRocketsWorkshop_RevB.pdf
- NASA usage guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/
- Corroborating NASA authorship / public-domain record: https://commons.wikimedia.org/wiki/File:Starship_IFT2_NASA_Video_2_Part_1.webm

NASA's guidelines permit factual, informational use of its own media without
separate permission, require source acknowledgement, and prohibit implying
NASA endorsement. Third-party media on NASA websites are not automatically
covered. This is the NASA-authored recording identified above; its use does
not imply endorsement of Rocketlight by NASA or SpaceX.

## Picture processing

Source: 1280 × 720, 60 fps, 173.001 seconds. Excerpt: **0.000–27.000 seconds**, at
real-time speed, no cuts. The existing top/bottom black bars are cropped by
24 pixels each. A modest contrast, gamma and saturation adjustment restores
legibility. Output: **1280 × 672, H.264, 30 fps, CRF 21, 0.5-second keyframes**,
MP4 faststart. The poster is the output's first frame. The ending keeps the
actual last video frame rather than switching to a separate illustration.

```sh
ffmpeg -ss 0 -i nasa-starship-ift2-original.mp4 -t 27 \
  -vf 'crop=1280:672:0:24,eq=contrast=1.18:brightness=0.012:saturation=1.1:gamma=1.1,scale=1280:672' \
  -r 30 -c:v libx264 -preset medium -crf 21 \
  -g 15 -keyint_min 15 -sc_threshold 0 -pix_fmt yuv420p \
  -an -movflags +faststart starship-launch-27s.mp4
```

## Sound design

**The source's selected audio segment is digitally silent** (measured maximum
−91 dB). The optional soundtrack is original synthesized sound design, not
location audio: filtered stochastic noise, low-frequency pressure, exhaust
crackle and a spatial air layer. No music or third-party audio samples are used.
Ignition grows around 5 seconds, engine pressure builds through liftoff around
12 seconds, and the tail recedes smoothly at the end. Reproduction source:
`build_launch_sound.py` (Python, NumPy, SciPy; fixed seed).

The sound is muxed into the video to keep picture, scrolling and audio on one
media clock. Playback starts muted; the viewer explicitly enables sound.
Suggested visible credit: **NASA · Sounddesign**.

```sh
python build_launch_sound.py
ffmpeg -i starship-launch-27s.mp4 -i starship-sound-design.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 160k \
  -af loudnorm=I=-18:TP=-2:LRA=12 -ar 48000 -t 27 \
  -movflags +faststart starship-launch-sound-27s.mp4
```

Final delivery: 27.000 seconds; H.264 video unchanged by muxing; AAC stereo,
48 kHz; 3,938,496 bytes. Keep the original 219.6 MB source outside the repository.
