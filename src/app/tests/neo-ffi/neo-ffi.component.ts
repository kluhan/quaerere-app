import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LikertScale } from 'src/app/share/enumerations/likert.enum';
import { Ocean } from 'src/app/share/enumerations/ocean.enum';
import { SetAnswer, SetScale } from 'src/app/actions/neoFfi.action';

@Component({
  selector: 'app-neo-ffi',
  templateUrl: './neo-ffi.component.html',
  styleUrls: ['./neo-ffi.component.scss']
})
export class NeoFfiComponent implements AfterViewInit {

  neoFfiForm: FormGroup;
  scale = LikertScale.LIKERT_FIVE_LEVEL;
  ocean = Ocean;

  questions = [
    ['qn0', 0, Ocean.NEUROTICISM, 'Ich bin nicht leicht beunruhigt.', ],
    ['qe0', 0, Ocean.EXTRAVERSION, 'Ich habe gerne viele Leute um mich herum.', ],
    ['qo0', 0, Ocean.OPENNESS, 'Ich mag meine Zeit nicht mit Tagträumereien verschwenden.', ],
    ['qa0', 0, Ocean.AGREEABLENESS, 'Ich versuche zu jedem, dem ich begegne, freundlich zu sein.', ],
    ['qc0', 0, Ocean.CONSCIENTIOUSNESS, 'Ich halte meine Sachen ordentlich und sauber.', ],

    ['qn1', 1, Ocean.NEUROTICISM, ' Ich fühle mich anderen oft unterlegen.', ],
    ['qe1', 1, Ocean.EXTRAVERSION, 'Ich bin leicht zum Lachen zu bringen.', ],
    ['qo1', 1, Ocean.OPENNESS, 'Ich finde philosophische Diskussionen langweilig.', ],
    ['qa1', 1, Ocean.AGREEABLENESS, 'Ich bekomme häufiger Streit mit meiner Familie und meinen Kollegen.', ],
    // tslint:disable-next-line: max-line-length
    ['qc1', 1, Ocean.CONSCIENTIOUSNESS, 'Ich kann mir meine Zeit recht gut einteilen, so dass ich meine Angelegenheiten rechtzeitig beende.', ],

    ['qn2', 2, Ocean.NEUROTICISM, 'Wenn ich unter starkem Stress stehe, fühle ich mich manchmal, als ob ich zusammenbräche.', ],
    ['qe2', 2, Ocean.EXTRAVERSION, 'Ich halte mich nicht für besonders fröhlich.', ],
    ['qo2', 2, Ocean.OPENNESS, 'Mich begeistern die Motive, die ich in der Kunst und in der Natur finde.', ],
    ['qa2', 2, Ocean.AGREEABLENESS, 'Manche Leute halten mich für selbstsüchtig und selbstgefällig.', ],
    ['qc2', 2, Ocean.CONSCIENTIOUSNESS, 'Ich bin kein sehr systematisch vorgehender Mensch.', ],

    ['qn2', 3, Ocean.NEUROTICISM, 'Ich fühle mich selten einsam oder traurig.', ],
    ['qe2', 3, Ocean.EXTRAVERSION, 'Ich unterhalte mich wirklich gerne mit anderen Menschen.', ],
    ['qo2', 3, Ocean.OPENNESS, 'Ich glaube, dass es Schüler oft nur verwirrt und irreführt, wenn man sie Rednern zuhören lässt, die kontroverse Standpunkte vertreten.', ],
    ['qa2', 3, Ocean.AGREEABLENESS, 'Ich würde lieber mit anderen zusammenarbeiten, als mit ihnen zu wetteifern.', ],
    ['qc2', 3, Ocean.CONSCIENTIOUSNESS, 'Ich versuche, alle mir übertragenen Aufgaben sehr gewissenhaft zu erledigen.', ],

    ['qn2', 4, Ocean.NEUROTICISM, 'Ich fühle mich oft angespannt und nervös.', ],
    ['qe2', 4, Ocean.EXTRAVERSION, 'Ich bin gerne im Zentrum des Geschehens.', ],
    ['qo2', 4, Ocean.OPENNESS, 'Poesie beeindruckt mich wenig oder gar nicht.', ],
    ['qa2', 4, Ocean.AGREEABLENESS, 'Im Hinblick auf die Absichten anderer bin ich eher zynisch und skeptisch.', ],
    ['qc2', 4, Ocean.CONSCIENTIOUSNESS, 'Ich habe eine Reihe von klaren Zielen und arbeite systematisch auf sie zu.', ],

    ['qn2', 5, Ocean.NEUROTICISM, 'Manchmal fühle ich mich völlig wertlos.', ],
    ['qe2', 5, Ocean.EXTRAVERSION, 'Ich ziehe es gewöhnlich vor, Dinge allein zu tun.', ],
    ['qo2', 5, Ocean.OPENNESS, 'Ich probiere oft neue und fremde Speisen aus.', ],
    ['qa2', 5, Ocean.AGREEABLENESS, 'Ich glaube, dass man von den meisten Leuten ausgenutzt wird, wenn man es zulässt.', ],
    ['qc2', 5, Ocean.CONSCIENTIOUSNESS, 'Ich vertrödele eine Menge Zeit, bevor ich mit einer Arbeit beginne.', ],

    ['qn2', 6, Ocean.NEUROTICISM, 'Ich empfinde selten Furcht oder Angst.', ],
    ['qe2', 6, Ocean.EXTRAVERSION, 'Ich habe oft das Gefühl, vor Energie überzuschäumen.', ],
    ['qo2', 6, Ocean.OPENNESS, 'Ich nehme nur selten Notiz von den Stimmungen oder Gefühlen, die verschiedene Umgebungen hervorrufen.', ],
    ['qa2', 6, Ocean.AGREEABLENESS, 'Die meisten Menschen, die ich kenne, mögen mich.', ],
    ['qc2', 6, Ocean.CONSCIENTIOUSNESS, 'Ich arbeite hart, um meine Ziele zu erreichen.', ],

    ['qn2', 7, Ocean.NEUROTICISM, 'Ich ärgere mich oft darüber, wie andere Leute mich behandeln.', ],
    ['qe2', 7, Ocean.EXTRAVERSION, 'Ich bin ein fröhlicher, gut gelaunter Mensch.', ],
    // tslint:disable-next-line: max-line-length
    ['qo2', 7, Ocean.OPENNESS, 'Ich glaube, dass wir bei ethischen Entscheidungen auf die Ansichten unserer religiösen Autoritäten achten sollten.', ],
    ['qa2', 7, Ocean.AGREEABLENESS, 'Manche Leute halten mich für kalt und berechnend.', ],
    ['qc2', 7, Ocean.CONSCIENTIOUSNESS, 'Wenn ich eine Verpflichtung eingehe, so kann man sich auf mich bestimmt verlassen.', ],

    ['qn2', 8, Ocean.NEUROTICISM, 'Zu häufig bin ich entmutigt und will aufgeben, wenn etwas schiefgeht.', ],
    ['qe2', 8, Ocean.EXTRAVERSION, 'Ich bin kein gut gelaunter Optimist.', ],
    // tslint:disable-next-line: max-line-length
    ['qo2', 8, Ocean.OPENNESS, 'Wenn ich Literatur lese oder ein Kunstwerk betrachte, empfinde ich manchmal ein Frösteln oder eine Welle der Begeisterung. ', ],
    ['qa2', 8, Ocean.AGREEABLENESS, 'In Bezug auf meine Einstellungen bin ich nüchtern und unnachgiebig.', ],
    ['qc2', 8, Ocean.CONSCIENTIOUSNESS, 'Manchmal bin ich nicht so verlässlich oder zuverlässig, wie ich sein sollte.', ],

    ['qn2', 9, Ocean.NEUROTICISM, 'Ich bin selten traurig oder deprimiert.', ],
    ['qe2', 9, Ocean.EXTRAVERSION, 'Ich führe ein hektisches Leben.', ],
    ['qo2', 9, Ocean.OPENNESS, 'Ich habe wenig Interesse, über die Natur des Universums oder die Lage der Menschheit zu spekulieren.', ],
    ['qa2', 9, Ocean.AGREEABLENESS, 'Ich versuche stets rücksichtsvoll und sensibel zu handeln.', ],
    ['qc2', 9, Ocean.CONSCIENTIOUSNESS, 'Ich bin eine tüchtige Person, die ihre Arbeit immer erledigt.', ],

    ['qn2', 10, Ocean.NEUROTICISM, 'Ich fühle mich oft hilflos und wünsche mir eine Person, die meine Probleme löst.', ],
    ['qe2', 10, Ocean.EXTRAVERSION, 'Ich bin ein sehr aktiver Mensch.', ],
    ['qo2', 10, Ocean.OPENNESS, 'Ich bin sehr wissbegierig. ', ],
    ['qa2', 10, Ocean.AGREEABLENESS, 'Wenn ich Menschen nicht mag, so zeige ich ihnen das auch offen.', ],
    ['qc2', 10, Ocean.CONSCIENTIOUSNESS, 'Ich werde wohl niemals fähig sein, Ordnung in mein Leben zu bringen.', ],

    ['qn2', 11, Ocean.NEUROTICISM, 'Manchmal war mir etwas so peinlich, dass ich mich am liebsten versteckt hätte.', ],
    ['qe2', 11, Ocean.EXTRAVERSION, 'Lieber würde ich meine eigenen Wege gehen, als eine Gruppe anzuführen.', ],
    ['qo2', 11, Ocean.OPENNESS, 'Ich habe oft Spaß daran, mit Theorien oder abstrakten Ideen zu spielen.', ],
    ['qa2', 11, Ocean.AGREEABLENESS, 'Um zu bekommen, was ich will, bin ich notfalls bereit, Menschen zu manipulieren.', ],
    ['qc2', 11, Ocean.CONSCIENTIOUSNESS, 'Bei allem, was ich tue, strebe ich nach Perfektion.', ],
  ];

  constructor(private store: Store, private fb: FormBuilder) {
    this.neoFfiForm = this.fb.group({});
    store.dispatch(new SetScale(this.scale));
  }

  async ngAfterViewInit() {
    this.questions.forEach(question => {
      this.neoFfiForm.get(question[0].toString()).valueChanges.subscribe(value =>
        this.store.dispatch(new SetAnswer(value, Number(question[1]), <Ocean>question[2] ))
      );
    });

  }
}













