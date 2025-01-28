// File: pages/excelvba.tsx

import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

/**
 * ExcelVBAページ:
 *   - FizzBuzz + 素数判定 + B9セルから部分再実行するVBAコードを掲載
 *   - 解説などを含め、ユーザがExcel側にコピペして使えるようにする
 */
export default function ExcelVBA() {
  return (
    <>
      <Head>
        <title>ExcelVBA - FizzBuzz & Prime Sample</title>
        <meta
          name="description"
          content="A Next.js page showing a complete sample of VBA for FizzBuzz & prime checking with partial re-run from row B9."
        />
        <meta charSet="UTF-8" />
      </Head>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>Excel VBA 実装例</h1>
        <p>
          以下は「シート『演習』のA列を見て、3/5/15の倍数チェック、素数チェック、累計カウンタ更新を行う」VBAコード例です。<br/>
          ボタンイベントを3つ用意し、<strong>2行目から実行</strong>、<strong>指定行から実行</strong>、<strong>素数判定</strong> を含む形でまとめています。
        </p>

        <h2>前提条件</h2>
        <ul>
          <li>「演習」シートを想定（A列, B列, C列, D/E/F列 など）。</li>
          <li>A列が空欄または "end" と出てきたら処理終了。</li>
          <li>途中実行開始行は B9 セルの値を使う。</li>
          <li>数値以外は FizzBuzz 判定しない。素数判定もしない。</li>
          <li>D/E/F 列に Fizz, Buzz, FizzBuzz の出現累計を随時記入。</li>
        </ul>

        <hr style={{ margin: '20px 0' }} />

        <h2>標準モジュール (Module1など) の VBA コード</h2>
        <pre
          style={{
            background: '#222',
            color: '#ccc',
            padding: '1rem',
            borderRadius: '8px',
            overflowX: 'auto',
          }}
        >
{`Option Explicit

'▼▼▼ まずは素数判定用の関数 ▼▼▼
Function IsPrime(ByVal num As Variant) As Boolean
    Dim i As Long
    Dim n As Long
    
    ' 数値でない場合や 2 未満の場合は素数ではない
    If Not IsNumeric(num) Then
        IsPrime = False
        Exit Function
    End If
    
    n = CLng(num)
    If n < 2 Then
        IsPrime = False
        Exit Function
    End If
    
    ' 2～Sqrt(n) で割り切れるかどうか
    For i = 2 To CLng(Sqr(n))
        If (n Mod i) = 0 Then
            IsPrime = False
            Exit Function
        End If
    Next i
    
    IsPrime = True
End Function

'▼▼▼ A列の値を判定して B/C/D/E/F列を更新する共通処理 ▼▼▼
Sub FizzBuzzAndPrimeProcess(ByVal startRow As Long)
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Worksheets("演習")
    
    Dim rowCnt As Long
    Dim valA As Variant
    
    ' 累計カウンタ
    Dim cntFizz     As Long
    Dim cntBuzz     As Long
    Dim cntFizzBuzz As Long
    
    ' 事前に「本当にこの行から実行してよいか」確認（ユーザに優しい実装）
    If MsgBox("行番号 " & startRow & " からFizzBuzz＆素数判定を実行します。よろしいですか？", _
              vbOKCancel Or vbQuestion) = vbCancel Then
        Exit Sub
    End If
    
    ' 最終行を取得
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    ' 開始行が最終行を超えていないかチェック
    If lastRow < startRow Then
        MsgBox "開始行(" & startRow & ")が最終データ行(" & lastRow & ")より大きいため、処理不要です。", vbExclamation
        Exit Sub
    End If
    
    ' 該当開始行～最終行の D/E/F 列をクリア (累計を取り直すため)
    ws.Range(ws.Cells(startRow, "D"), ws.Cells(lastRow, "F")).ClearContents
    
    ' メインループ
    For rowCnt = startRow To lastRow
        
        valA = ws.Cells(rowCnt, "A").Value
        
        ' 空白 or "end" ならループ終了
        If (Trim(valA & "") = "") Or (LCase(valA & "") = "end") Then
            Exit For
        End If
        
        ' 素数判定 → C列に"●"
        If IsPrime(valA) Then
            ws.Cells(rowCnt, "C").Value = "●"
        Else
            ws.Cells(rowCnt, "C").ClearContents
        End If
        
        ' FizzBuzz判定 → B列
        Dim numA As Long
        Dim strResult As String
        
        If IsNumeric(valA) Then
            numA = CLng(valA)
            
            If numA Mod 15 = 0 Then
                strResult = "FizzBuzz"
            ElseIf numA Mod 3 = 0 Then
                strResult = "Fizz"
            ElseIf numA Mod 5 = 0 Then
                strResult = "Buzz"
            Else
                strResult = ""
            End If
        Else
            strResult = ""
        End If
        
        ws.Cells(rowCnt, "B").Value = strResult
        
        ' 累計カウンタを更新
        Select Case strResult
            Case "FizzBuzz"
                cntFizzBuzz = cntFizzBuzz + 1
            Case "Fizz"
                cntFizz = cntFizz + 1
            Case "Buzz"
                cntBuzz = cntBuzz + 1
        End Select
        
        ' D/E/F列に累計を反映
        ws.Cells(rowCnt, "D").Value = cntFizz
        ws.Cells(rowCnt, "E").Value = cntBuzz
        ws.Cells(rowCnt, "F").Value = cntFizzBuzz
    Next rowCnt
    
    MsgBox "FizzBuzz & 素数判定が完了しました。", vbInformation
End Sub

'▼▼▼ (1)～(3) の 実行ボタン用のマクロ ▼▼▼
Public Sub BtnExec_Click()
    ' シート「演習」の 2行目から処理を開始
    FizzBuzzAndPrimeProcess 2
End Sub

'▼▼▼ (2) 「行目から実行」ボタン用のマクロ ▼▼▼
Public Sub BtnExecFromRow_Click()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Worksheets("演習")
    
    Dim startRow As Long
    
    ' B9セルを読み取り (数値でない場合は2行目にフォールバック)
    If IsNumeric(ws.Range("B9").Value) Then
        startRow = CLng(ws.Range("B9").Value)
    Else
        startRow = 2
        MsgBox "B9の値が数値でないため、2行目から実行します。", vbExclamation
    End If
    
    ' 2未満なら2行目に補正
    If startRow < 2 Then
        startRow = 2
        MsgBox "B9の値が2未満なので、2行目から実行します。", vbExclamation
    End If
    
    ' 実行
    FizzBuzzAndPrimeProcess startRow
End Sub
`}
        </pre>

        <p>
          このコードを「標準モジュール(Module1やSampleなど)」に貼り付けて、<br/>
          ①<code>BtnExec_Click</code>ボタン → 2行目から実行<br/>
          ②<code>BtnExecFromRow_Click</code>ボタン → B9セルの行から実行<br/>
          などの形で関連付ければ動作します。<br/>
          実行前に確認メッセージを出したり、処理完了後にMsgBoxで知らせるため、ユーザーフレンドリーな設計になっています。
        </p>

        <hr style={{ margin: '20px 0' }} />
        <h2>ポイント</h2>
        <ul>
          <li>A列が数値以外の場合はFizzBuzz・素数判定をスキップしています。</li>
          <li>D/E/F列を開始行～最終行分だけクリアし、0から再集計しています。</li>
          <li>既存D/E/Fを活かして途中から継続計算する場合は、コードを多少アレンジしてください。</li>
          <li>シート「演習」以外の名前を使うなら、<code>Worksheets("演習")</code> を書き換えてください。</li>
        </ul>

        <p style={{ marginTop: '2rem' }}>
          以上のVBAコードで、Fizz/Buzz/FizzBuzzと素数を同時にチェックしつつ累計を記録できます。<br/>
          適宜カスタマイズしてご利用ください。
        </p>
      </div>

      {/* ★（背景アニメなどを使いたい場合は自由にScriptタグを置く） */}
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('galaxyArtSim loaded on ExcelVBA page')
        }}
      />
    </>
  )
}
