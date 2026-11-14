"""Original deterministic launch sound design. No recordings, samples or music."""
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io.wavfile import write

ROOT = Path(__file__).parent
SR = 48000
DURATION = 27
N = SR * DURATION
rng = np.random.default_rng(20261115)
t = np.arange(N) / SR

def bandnoise(low, high):
    x = rng.normal(0, 1, N)
    sos = butter(3, [low, high], btype='bandpass', fs=SR, output='sos')
    x = sosfilt(sos, x)
    return x / (np.std(x) + 1e-10)

def smooth(a, b):
    z = np.clip((t-a)/(b-a), 0, 1)
    return z*z*(3-2*z)

# Wind/vent bed, then ignition pressure and the full engine column.
ignition = smooth(4.7, 7.0)
full = smooth(7.0, 12.5)
recede = 1 - 0.37*smooth(18.0, 26.7)
end = 1 - smooth(25.7, 27.0)
start = smooth(0, .7)
engine = ignition * (.44 + .56*full) * recede
rumble = bandnoise(24, 160)
roar = bandnoise(130, 2200)
jet = bandnoise(850, 6500)
# Slowly evolving pressure fluctuations, not tonal music.
pressure = bandnoise(.4, 3.5)
pressure = np.clip(.88 + .08*pressure + .055*np.sin(2*np.pi*7.7*t), .5, 1.2)
core = engine*pressure*(.20*rumble + .13*roar + .024*jet)
sub = .035*engine*(np.sin(2*np.pi*(32*t+.035*np.sin(2*np.pi*.38*t))) + .35*np.sin(2*np.pi*61*t))
# Non-repeating exhaust crackles use short, filtered stochastic impulses.
pops = np.zeros(N)
for when in rng.uniform(5.0, 26.5, 390):
    k = int(when*SR)
    length = int(rng.uniform(.012, .055)*SR)
    j = np.arange(min(length, N-k))
    decay = np.exp(-j/(.006*SR))*np.minimum(j/(.0008*SR), 1)
    pops[k:k+len(j)] += rng.uniform(.2,.8)*rng.normal(size=len(j))*decay
pops = sosfilt(butter(2, [280,4100], btype='bandpass', fs=SR, output='sos'), pops)
pops = .11*engine*pops
# Brief ignition swell: a thick rush, without an explosion or orchestral hit.
ignition_swell = np.exp(-((t-5.6)/.70)**2)*(.085*bandnoise(30,300) + .014*bandnoise(350,3200))
wind_l = .008*bandnoise(90,1800)*(1-.75*ignition)
wind_r = .008*bandnoise(90,1800)*(1-.75*ignition)
space_l = .025*engine*bandnoise(180,1400)
space_r = .025*engine*bandnoise(180,1400)
mono = core + sub + pops + ignition_swell
# Correlated low-end keeps impact focused; decorrelated air gives width.
left = mono + wind_l + space_l
right = mono + wind_r + space_r
for delay, gain in [(int(.09*SR),.085), (int(.17*SR),.055)]:
    left[delay:] += mono[:-delay]*gain
    right[delay+31:] += mono[:-delay-31]*gain
stereo=np.column_stack([left,right])*start[:,None]*end[:,None]
stereo=np.tanh(stereo*1.45)
stereo*=.86/(np.max(np.abs(stereo))+1e-10)
write(ROOT/'starship-sound-design.wav', SR, (stereo*32767).astype(np.int16))
print({'duration':DURATION,'peak':float(np.max(np.abs(stereo))),'rms':float(np.sqrt(np.mean(stereo**2)))})
