import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.scss',
})
export class RespuestaComponent implements OnInit {
  @ViewChild('dataTable', { static: false }) table: ElementRef = new ElementRef(
    'table-dudas'
  );
  columnas: any = [];

  listado_dudas: any = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.setts();
    this.usuarioService.dudas().subscribe({
      next: (data: any) => {
        this.listado_dudas = data.dudas;
        this.listado_dudas = this.listado_dudas.filter(
          (duda: any) => duda.correcta === 0
        );
        if (this.listado_dudas.length !== 0) {
          this.listado_dudas = this.listado_dudas.map((duda: any) => {
            return {
              Id: duda.id,
              Nombre: duda.nombre,
              Apellido: duda.apellido,
              Correo: duda.correo,
              Edad: duda.edad,
              Pregunta: duda.pregunta,
            };
          });
          this.columnas = Object.keys(this.listado_dudas[0]);
          if (this.table && this.table.nativeElement) {
            this.iniciar_tabla();
          }
        }

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  iniciar_tabla() {
    const labelData = {
      placeholder: 'Buscar...',
      searchTitle: 'Buscar dentro de la tabla',
      perPage: 'Registros por página',
      noRows: 'No se encontraron registros',
      info: 'Registros de {start} a {end} de {rows} (Página {page} de {pages} páginas)',
    };

    if (typeof window !== 'undefined') {
      //  let data_table = new (window as any).simpleDatatables.DataTable(this.table.nativeElement, {
      let data_table = new (window as any).simpleDatatables.DataTable(
        this.table.nativeElement,
        {
          data: {
            headings: this.columnas,
            data: this.listado_dudas,
          },
          labels: labelData,
        }
      );

      (window as any).datatable = data_table;
    }
  }

  setts = () => {
    if (typeof document !== 'undefined') {
      ('use strict');

      /**
       * Easy selector helper function
       */
      const select = (
        el: string,
        all: boolean = false
      ): Element | NodeListOf<Element> | null => {
        el = el.trim();
        if (all) {
          return document.querySelectorAll(el);
        } else {
          return document.querySelector(el);
        }
      };

      /**
       * Easy event listener function
       */
      const on = (
        type: string,
        el: string,
        listener: EventListenerOrEventListenerObject,
        all: boolean = false
      ): void => {
        if (all) {
          (select(el, all) as NodeListOf<Element>).forEach((e) =>
            e.addEventListener(type, listener)
          );
        } else {
          (select(el) as Element).addEventListener(type, listener);
        }
      };

      /**
       * Easy on scroll event listener
       */
      const onscroll = (
        el: EventTarget,
        listener: EventListenerOrEventListenerObject
      ): void => {
        el.addEventListener('scroll', listener);
      };

      /**
       * Sidebar toggle
       */
      if (select('.toggle-sidebar-btn')) {
        on('click', '.toggle-sidebar-btn', function () {
          (select('body') as Element).classList.toggle('toggle-sidebar');
        });
      }

      /**
       * Search bar toggle
       */
      if (select('.search-bar-toggle')) {
        on('click', '.search-bar-toggle', function () {
          (select('.search-bar') as Element).classList.toggle(
            'search-bar-show'
          );
        });
      }

      /**
       * Navbar links active state on scroll
       */
      const navbarlinks = select(
        '#navbar .scrollto',
        true
      ) as NodeListOf<Element>;
      const navbarlinksActive = (): void => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
          if (!(navbarlink instanceof HTMLAnchorElement && navbarlink.hash))
            return;
          const section = select(navbarlink.hash) as HTMLElement;
          if (!section) return;
          if (
            position >= section.offsetTop &&
            position <= section.offsetTop + section.offsetHeight
          ) {
            navbarlink.classList.add('active');
          } else {
            navbarlink.classList.remove('active');
          }
        });
      };
      window.addEventListener('load', navbarlinksActive);
      onscroll(document, navbarlinksActive);

      /**
       * Toggle .header-scrolled class to #header when page is scrolled
       */
      const selectHeader = select('#header') as Element;
      if (selectHeader) {
        const headerScrolled = (): void => {
          if (window.scrollY > 100) {
            selectHeader.classList.add('header-scrolled');
          } else {
            selectHeader.classList.remove('header-scrolled');
          }
        };
        window.addEventListener('load', headerScrolled);
        onscroll(document, headerScrolled);
      }

      /**
       * Back to top button
       */
      const backtotop = select('.back-to-top') as Element;
      if (backtotop) {
        const toggleBacktotop = (): void => {
          if (window.scrollY > 100) {
            backtotop.classList.add('active');
          } else {
            backtotop.classList.remove('active');
          }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
      }

      /**
       * Initiate tooltips
       */
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      const tooltipList = tooltipTriggerList.map(function (
        tooltipTriggerEl: Element
      ) {
        return new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });

      /**
       * Initiate quill editors
       */
      if (select('.quill-editor-default')) {
        new (window as any).Quill('.quill-editor-default', {
          theme: 'snow',
        });
      }

      if (select('.quill-editor-bubble')) {
        new (window as any).Quill('.quill-editor-bubble', {
          theme: 'bubble',
        });
      }

      if (select('.quill-editor-full')) {
        new (window as any).Quill('.quill-editor-full', {
          modules: {
            toolbar: [
              [{ font: [] }, { size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ script: 'super' }, { script: 'sub' }],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['direction', { align: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          },
          theme: 'snow',
        });
      }

      /**
       * Initiate TinyMCE Editor
       */
      const useDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

      (window as any).tinymce.init({
        selector: 'textarea.tinymce-editor',
        plugins:
          'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar:
          'undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' },
        ],
        image_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' },
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' },
        ],
        importcss_append: true,
        file_picker_callback: (
          callback: (url: string, meta: any) => void,
          value: string,
          meta: any
        ) => {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', {
              text: 'My text',
            });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', {
              alt: 'My alt text',
            });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', {
              source2: 'alt.ogg',
              poster: 'https://www.google.com/logos/google.jpg',
            });
          }
        },
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
      });

      /**
       * Initiate Bootstrap validation check
       */
      const needsValidation = document.querySelectorAll('.needs-validation');

      Array.prototype.slice
        .call(needsValidation)
        .forEach(function (form: HTMLFormElement) {
          form.addEventListener(
            'submit',
            function (event: Event) {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }

              form.classList.add('was-validated');
            },
            false
          );
        });

      /**
       * Initiate Datatables
       */
      const datatables = select('.datatable', true) as NodeListOf<Element>;
      datatables.forEach((datatable) => {
        new (window as any).simpleDatatables.DataTable(datatable, {
          perPageSelect: [5, 10, 15, ['All', -1]],
          columns: [
            { select: 2, sortSequence: ['desc', 'asc'] },
            { select: 3, sortSequence: ['desc'] },
            { select: 4, cellClass: 'green', headerClass: 'red' },
          ],
        });
      });

      /**
       * Autoresize echart charts
       */
      const mainContainer = select('#main');
      if (mainContainer) {
        setTimeout(() => {
          new ResizeObserver(() => {
            (select('.echart', true) as NodeListOf<Element>).forEach(
              (getEchart) => {
                (window as any).echarts.getInstanceByDom(getEchart).resize();
              }
            );
          }).observe(mainContainer as Element);
        }, 200);
      }
    }
  };
}
