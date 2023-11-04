# Skyrim Voiced Follower Modlist

A list of all voiced followers in Skyrim, including the ID and file-name required to do patchless interactions

## Conditions for inclusion

- Not stolen from another universe
- Custom voiced
- Not voiced by xVASynth
- Skyrim SE/AE only
- At least one version released
- English version

## Contributing

If a follower is missing just add the following information to mods.yml or open an issue with the mod-link:

```yml
- name: Idrinth Thalui - Custom Voiced male Altmer
  link: https://www.nexusmods.com/skyrimspecialedition/mods/69338
  file: IdrinthThalui.esp
  description: This follower, trainer, questgiver and merchant is a male Altmer, focussing on Restoration magic and twohanded, elven swords. Comes with custom dialogue and patrols the world! 
  author: Björn "Idrinth" Büttner
  adult-only: false
  xbox: false
  version: 0.54.1
  released: 2022-06-08
  updated: 2023-07-23
  followers:
  - name: Idrinth Thalui
    race: High Elf
    sex: male
    lines: 1837
    reference: "0x803"
    interactions:
    - name: Serana
      file: Dawnguard.esm
      scene: true
      commentary: true
      dialogue: true
```

### Reference-ID

The reference id is the id of the placed actor in the world. if you are in the creation kit, it is on the top line to the right side. Remove the first two characters and any leading zeroes from it.

![Reference-ID](/reference-id.png)

### If you never worked with github

![Edit-Button](/edit-button.png)

- create a free account
- click on the edit-button(pencil) on mods.yml
- make your changes
- double check indentation(spacing)
- commit your changes, they will then be in your copy of the repository(place where you store your files)
- create a pull request in this repository
