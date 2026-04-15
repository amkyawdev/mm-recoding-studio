# 🎙️ Myanmar Recording Studio

Local tool for recording yourself to train a Myanmar text to speech voice.

## Live Demo

🌐 **Try it now:** https://mm-recoding-studio.vercel.app

---

## Screenshots

### Main Page
![Main Page](screenshots/main.png)

### Recording Interface
![Recording](screenshots/recording.png)

### Progress Tracking
![Progress](screenshots/progress.png)

---

## အသုံးပါနည်းလမ်းများ

### Docker ဖြင့်သုံးနည်း

```sh
docker run -it -p 8000:8000 -v '/path/to/output:/app/output' amkyawdev/mm-recording-studio
```

Visit http://localhost:8000 to select a language and start recording.

### Docker မသုံးဘဲ သုံးနည်း

```sh
git clone https://github.com/amkyawdev/mm-recording-studio.git
cd mm-recording-studio/

python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```

### အလုပ်လုပ်နည်း

```sh
python3 -m mm_recording_studio
```

Visit http://localhost:8000 to select a language and start recording.

Prompts are in the `prompts/` directory with the following format:

* Language directories are named `<language name>_<language code>`
* Each `.txt` in a language directory contains lines with:
    * `<id>\t<text>` or
    * `text` (id is automatically assigned based on line number)

Output audio is written to `output/`

See `--debug` for more options.

## Multi-User Mode

```sh
python3 -m mm_recording_studio --multi-user
```

Now a "login code" will be required to record. A directory `output/user_<code>/<language>` must exist for each user and language.

## မြန်မာစာ အသံဖမ်းခြင်း

ဤအပလီကေးရှင်းသည် မြန်မာစာ အသံဒေတာ ဖန်းတီးရန် အတွက် ဖန်းတီးထားပါတယ်။

ပါးစုမှတ်တမ်းများသည် Amkyawdev TTS အတွက် သုံးပါတယ်။

## License

MIT License
