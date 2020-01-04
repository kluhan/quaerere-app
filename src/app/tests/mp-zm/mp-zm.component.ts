import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LikertScale } from 'src/app/share/enumerations/likert.enum';
import { SetAnswer, SetScale } from 'src/app/actions/mpZm.action';
import { Zurich } from 'src/app/share/enumerations/zurich.enum';

@Component({
  selector: 'app-mp-zm',
  templateUrl: './mp-zm.component.html',
  styleUrls: ['./mp-zm.component.scss']
})
export class MpZmComponent implements AfterViewInit {

  mpZmForm: FormGroup;
  scale = LikertScale.LIKERT_FIVE_LEVEL;
  zurich = Zurich;

  questions = [
    ['qs0', 0, Zurich.SAFETY, 'Zugehörigkeit ist mir sehr wichtig.', ],
    ['qs1', 1, Zurich.SAFETY, 'Es wäre für mich schlimm, wenn ich im Urlaub sehr krank werde und kein Bekannter bei mir ist.', ],
    ['qs2', 2, Zurich.SAFETY, 'Ich wünsche mir einen guten Kontakt zu meiner Verwandtschaft.', ],
    ['qs3', 3, Zurich.SAFETY, 'Ich brauche vertraute Menschen um mich herum.', ],
    ['qs4', 4, Zurich.SAFETY, 'Mir ist es äußert wichtig, mich bei meinem Lebenspartner immer geborgen zu fühlen.', ],
    ['qs5', 5, Zurich.SAFETY, 'Ich fühle mich unwohl, wenn ich längere Zeit keine vertrauten Menschen um mich habe.', ],

    ['qi0', 0, Zurich.INITIATIVE, 'Ich bin ständig auf der Suche nach neuen Erfahrungen.', ],
    ['qi1', 1, Zurich.INITIATIVE, 'Ich liebe Nervenkitzel.', ],
    ['qi2', 2, Zurich.INITIATIVE, 'Unbekannte Situationen finde ich sehr reizvoll.', ],
    ['qi3', 3, Zurich.INITIATIVE, 'Es macht mir Freude, ungewohnte Dinge zu erleben.', ],
    ['qi4', 4, Zurich.INITIATIVE, 'Ich begebe mich in meiner Freizeit gerne in aufregende Situationen, die auch gefährlich sein können.', ],
    ['qi5', 5, Zurich.INITIATIVE, 'Am liebsten möchte ich ständig etwas unternehmen.', ],

    ['qm0', 0, Zurich.MIGHT, 'In meinem Umfeld wird mir mehr als anderen zugebilligt, Kritik zu äußern.', ],
    ['qm1', 1, Zurich.MIGHT, 'Bei Entscheidungen setze ich meinen Willen manchmal auch gegen Widerstände durch.', ],
    ['qm2', 2, Zurich.MIGHT, 'In einem Arbeitsteam übernehme ich gerne die Führung.', ],
    ['qm3', 3, Zurich.MIGHT, 'Ich bringe andere gezielt dazu, Dinge zu tun, die sie von sich aus nicht getan hätten.', ],
    ['qm4', 4, Zurich.MIGHT, 'Bei der Planung von Aktivitäten im Freundeskreis setze ich mich letztendlich durch.', ],
    ['qm5', 5, Zurich.MIGHT, 'Ich strebe Macht und Einfluss an.', ],

    ['qr0', 0, Zurich.REPUTE, 'Ich brauche sehr viele positive Rückmeldungen von meinem Umfeld.', ],
    ['qr1', 1, Zurich.REPUTE, 'Ich will, dass mein Partner/ meine Partnerin mich gegenüber anderen in einem sehr guten Licht darstellt.', ],
    ['qr2', 2, Zurich.REPUTE, 'Eine gute Leistung ohne Lob ist für mich weniger wert.', ],
    ['qr3', 3, Zurich.REPUTE, 'Ich will, dass mein Partner/ meine Partnerin mich bewundert.', ],
    ['qr4', 4, Zurich.REPUTE, 'Ein beruflicher Erfolg ist besonders schön, wenn andere ihn auch bemerken.', ],
    ['qr5', 5, Zurich.REPUTE, 'Ich wäre gerne eine berühmte Person.', ],

    ['qa0', 0, Zurich.ACCOMPLISHMENT, 'Mir ist es wichtig, gute Leistungen zu bringen.', ],
    ['qa1', 1, Zurich.ACCOMPLISHMENT, 'In meinem Beruf mache ich viel mehr als das, was von mir verlangt wird.', ],
    ['qa2', 2, Zurich.ACCOMPLISHMENT, 'Um Erfolg zu haben, scheue ich keinen Aufwand.', ],
    ['qa3', 3, Zurich.ACCOMPLISHMENT, 'Es macht mir Spaß, an Problemen zu arbeiten, die ein bisschen schwierig für mich sind.', ],
    ['qa4', 4, Zurich.ACCOMPLISHMENT, 'Ich habe hohe Ansprüche an mich selbst.', ],
    ['qa5', 5, Zurich.ACCOMPLISHMENT, 'Es beschäftigt mich, wie ich meine schon guten Leistungen noch besser machen kann.', ],
  ];

  constructor(private store: Store, private fb: FormBuilder) {
    this.mpZmForm = this.fb.group({});
    store.dispatch(new SetScale(this.scale));
  }

  get formGroup() {
    return this.mpZmForm;
  }

  async ngAfterViewInit() {
    this.questions.forEach(question => {
      this.mpZmForm.get(question[0].toString()).valueChanges.subscribe(value =>
        this.store.dispatch(new SetAnswer(value, Number(question[1]), <Zurich>question[2] ))
      );
    });

  }
}
